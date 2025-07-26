import { Ionicons } from '@expo/vector-icons';
import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
    handleClose: () => void;
    onCreated: () => void;
}

export default function CreateAgenda({ handleClose, onCreated }: Props) {
    const [userUid, setUserUid] = useState<string | null>(null);

    useEffect(() => {
        const auth = getAuth(getApp());
        setUserUid(auth.currentUser?.uid ?? null);
    }, []);

    const [agendaName, setAgendaName] = useState('');
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
        try {
            await cadastrarAgenda();
            onCreated();
            handleClose();
        } catch (error) {
            throw error
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
                        style={styles.textInput}
                        placeholder='Digite o nome da agenda'
                        placeholderTextColor={"gray"}
                        value={agendaName}
                        onChangeText={setAgendaName}
                        accessibilityLabel="Nome da Agenda"
                        nativeID="agendaNameInput"
                    />
                </View>
            </View>
            <TouchableOpacity onPress={() => {
                if (agendaName == "") {
                    alert('Ponha um nome para a agenda!')
                }
                else {
                    saveAndClose()
                }
            }} style={styles.button}>
                <Ionicons size={17} color={"#FFF"} name={"arrow-forward-outline"} />
                <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
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
        height: 50,
        width: 130,
        gap: 10,
        backgroundColor: "#b686f4",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        position: "absolute",
        right: 20,
        bottom: 20,
    },

    buttonText: {
        color: "#FFF",
        fontSize: 17,
    }
})