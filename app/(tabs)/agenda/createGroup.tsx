import { Ionicons } from '@expo/vector-icons';
import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FAB, TextInput } from 'react-native-paper';

type Props = {
    handleClose: () => void;
    onCreated: () => void;
}

export default function CreateAgenda({ handleClose, onCreated }: Props) {
    const [userUid, setUserUid] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [agendaName, setAgendaName] = useState('');

    useEffect(() => {
        const auth = getAuth(getApp());
        setUserUid(auth.currentUser?.uid ?? null);
    }, []);

    const cadastrarAgenda = async () => {
        const nome = encodeURIComponent(agendaName);
        const chave = encodeURIComponent(process.env.EXPO_PUBLIC_API_KEY ?? "");

        const url = `${process.env.EXPO_PUBLIC_API_URL}/add/agenda?nome_agenda=${nome}&uid_do_responsavel=${userUid}&api_key=${chave}`;

        try {
          const response = await fetch(url, {
            method: "POST",
          });

            const json = await response.json();
            console.log("Resposta da API:", json);
            return json;
        } catch (error) {
            console.log("Erro ao cadastrar:", error);
            throw error;
        }
    };

    async function saveAndClose() {
        if (loading) return; // Prevent double execution

        setLoading(true);
        try {
            await cadastrarAgenda();
            onCreated();
            handleClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Allow pressing again if needed
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleClose}>
                    <Ionicons size={30} color={"purple"} name={"arrow-back-outline"} />
                </TouchableOpacity>
                <Text style={{ fontSize: 25 }}>Criar Agenda</Text>
            </View>
            <View style={{ gap: 20 }}>
                <View>
                    <Text style={styles.titleInput}>Nome</Text>
                    <TextInput
                        placeholder='Digite o nome da agenda'
                        placeholderTextColor={"gray"}
                        mode='outlined'
                        value={agendaName}
                        onChangeText={setAgendaName}
                        accessibilityLabel="Nome da Agenda"
                        nativeID="agendaNameInput"
                    />
                </View>
            </View>
            <FAB
                icon="arrow-right"
                label="Confirmar"
                onPress={() => {
                    if (loading) return;
                    if (agendaName === "") {
                        alert("Ponha um nome para a agenda!");
                    } else {
                        saveAndClose();
                    }
                }}
                loading={loading}
                disabled={loading}
                style={styles.button}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "3%"
    },

    header: {
        flexDirection: 'row',
        alignItems: "center",
        gap: 10,
        paddingBottom: 30,
        height: 80
    },

    textInput: {
        width: "99%",
        height: 47,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderColor: "rgba(96, 39, 170, 0.6)",
        borderRadius: 4
    },

    textInputUid: {
        width: "99%",
        height: 47,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderColor: "rgba(96, 39, 170, 0.6)",
        borderRadius: 4,
        justifyContent: "center",
        color: "gray",
        textAlignVertical: "center"
    },

    titleInput: {
        paddingLeft: 15,
        color: "rgba(96, 39, 170, 0.6)"
    },

    button: {
        position: 'absolute',
        right: 16,
        bottom: 16,
    },

    buttonText: {
        color: "#FFF",
        fontSize: 17,
    }
})