import { Ionicons } from "@expo/vector-icons";
import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import { useIsFocused } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Modal, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import AgendaItem from '@/components/agendaItem';
import CreateAgenda from "./createGroup";
import { FAB, ActivityIndicator } from 'react-native-paper';
import { ComeToGroup } from "@/components/comeToGroup";

type Agendas = {
    uid_da_agenda: string
    nome_agenda: string
    chave_de_convite: string
    firstCreated: string
};

export default function Agenda() {

    const [userUid, setUserUid] = useState<string | null>(null);
    const [agendas, setAgendas] = useState<Record<string, Agendas>>({});
    const [refreshing, setRefreshing] = useState(false);
    
    const [visibleComeInToGroup, setVisibleComeInToGroup] = useState(false);
    const [visibleCreateGroup, setVisibleCreate] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [firstLoadDone, setFirstLoadDone] = useState(false);
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

        setLoading(true);

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
            })
            .finally(() => setLoading(false));
    }, [userUid]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        return fetchAgendas().finally(() => setRefreshing(false));
    }, [fetchAgendas]);

    useEffect(() => {
        if (!focused || firstLoadDone) return;

        if (!agendas || Object.keys(agendas).length === 0) {
            onRefresh().then(() => setFirstLoadDone(true));
        } else {
            setFirstLoadDone(true);
        }
    }, [focused, agendas, onRefresh, firstLoadDone]);

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
                    {loading && !firstLoadDone ? (
                        <ActivityIndicator animating={true} size="large" />
                    ) : agendaArray.length > 0 ? (
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

                <Modal animationType="slide" visible={visibleCreateGroup} onRequestClose={() => setVisibleCreate(false)}>
                    <CreateAgenda handleClose={() => setVisibleCreate(false)} onCreated={onAgendaCreated} />
                </Modal>

                <Modal transparent={true} visible={visibleComeInToGroup} animationType="fade">
                    <ComeToGroup handleClose={()=> setVisibleComeInToGroup(false)}/>
                </Modal>

                <FAB
                    icon="plus"
                    label="Criar um grupo"
                    onPress={() => setVisibleCreate(true)}
                    style={styles.btnCreate}
                />

                <FAB
                    icon="plus"
                    label="Entrar num grupo"
                    onPress={() => setVisibleComeInToGroup(true)}
                    style={styles.btnAdd}
                />
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
        position: 'absolute',
        right: 16,
        bottom: 16,
    },

    btnAdd:{
        position: 'absolute',
        left: 16,
        bottom: 16
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