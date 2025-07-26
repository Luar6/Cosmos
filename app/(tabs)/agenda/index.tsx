import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import AgendaItem from "@/components/agendaItem";
import CreateAgenda from "./createGroup";
import { useIsFocused } from "@react-navigation/native";
import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';

type Agendas = {
    nome_agenda: string
    chave_de_convite: string
    firstCreated: string
};

export default function Agenda() {
    const [userUid, setUserUid] = useState<string | null>(null);
    const [agendas, setAgendas] = useState<Record<string, Agendas>>({});
    const [refreshing, setRefreshing] = useState(false);
    const [visibleCreateGroup, setVisibleCreate] = useState(false);
    const focused = useIsFocused();

    useEffect(() => {
        const auth = getAuth(getApp());
        setUserUid(auth.currentUser?.uid ?? null);
    }, []);

    const fetchAgendas = useCallback(() => {
        if (!userUid) {
            console.log("User UID is null, skipping fetch.");
            return Promise.resolve();
        }

        const url = `${process.env.EXPO_PUBLIC_API_URL}/getAllAgendasLinkedToUser?uid_do_responsavel=${userUid}&api_key=${process.env.EXPO_PUBLIC_API_KEY}`;
        console.log("Fetching agendas for UID:", userUid);

        return fetch(url)
            .then(async response => {
                if (!response.ok) {
                    const errorText = await response.text();
                    setAgendas({});
                    throw new Error(`${response.status} - ${errorText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched data:", data);
                setAgendas(data);
            })
            .catch(err => {
                console.log("Erro na requisição: " + err);
            });
    }, [userUid]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchAgendas().finally(() => setRefreshing(false));
    }, [fetchAgendas]);

    useEffect(() => {
        if (!focused) return;

        if (!agendas || Object.keys(agendas).length === 0) {
            onRefresh();
        }
    }, [focused, agendas, onRefresh]);

    const agendaArray = Object.entries(agendas).map(([id, value]) => ({
        id,
        ...value,
    })).sort((a, b) => new Date(b.firstCreated).getTime() - new Date(a.firstCreated).getTime());

    const onAgendaCreated = () => {
        fetchAgendas();
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
                <View style={styles.content}>
                    {Object.keys(agendas).length > 0 ? (
                        <View style={styles.schedules}>
                            <FlatList
                                data={agendaArray}
                                renderItem={({ item }) => (
                                    <AgendaItem data={item} />
                                )}
                                keyExtractor={(item) => item.id}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                }
                            />
                        </View>
                    ) : (
                        <View style={styles.default}>
                            <Ionicons size={25} color={"gray"} name={"person-add"} />
                            <Text style={styles.default}>
                                Você ainda não está em nenhuma agenda! Clique abaixo para criar uma e convidar seus colegas de classe.
                            </Text>
                        </View>
                    )}
                </View>

                <Modal animationType="slide" visible={visibleCreateGroup}>
                    <CreateAgenda handleClose={() => setVisibleCreate(false)} onCreated={onAgendaCreated} />
                </Modal>

                <TouchableOpacity onPress={() => setVisibleCreate(true)} style={styles.btnCreate}>
                    <Text style={styles.btnCreateTxt}>Criar um Grupo</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        flex: 1,
    },
    content: {
        flex: 1,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
    },
    default: {
        alignItems: "center",
        color: "gray",
        width: 300,
        textAlign: "center",
    },
    btnCreate: {
        position: "absolute",
        right: 20,
        bottom: 20,
        width: 150,
        height: 50,
        backgroundColor: "#b686f4",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    },
    btnCreateTxt: {
        color: "#FFF",
        fontWeight: "bold",
    },
    schedules: {
        flex: 1,
        width: "100%",
    },
});
