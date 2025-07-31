import { Ionicons } from "@expo/vector-icons";
import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FAB } from 'react-native-paper';

type Props = {
    handleClose: () => void;

}

type Agenda = {
    id: string
    uid_da_agenda: string
    nome_agenda: string
    chave_de_convite: string
    firstCreated: string
};

export function ComeToGroup({ handleClose }: Props) {

    const [userUid, setUserUid] = useState('');

    useEffect(() => {
        const auth = getAuth(getApp());
        setUserUid(auth.currentUser?.uid ?? '');
    }, []);

    const [objectAgenda, setObjectAgenda] = useState<Agenda>()
    const [inviteCode, setInviteCode] = useState('');
    const chave = encodeURIComponent(process.env.EXPO_PUBLIC_API_KEY ?? '');

    const urlGetAgendaCode = `${process.env.EXPO_PUBLIC_API_URL}/invite/${inviteCode}`


    const getAgendaByCode = async (): Promise<Agenda | undefined> => {
        try {
            const response = await fetch(urlGetAgendaCode)
            if (!response.ok) {
                const text = response.text();
                console.log(`${response.status} - ${text}`);
                return undefined;
            }
            const data: Agenda = await response.json();
            console.log('data: ', data);
            return data;
        } catch (err) {
            console.log('erro ao armazenar a agenda: ', err);
            return undefined;
        }
    }

    useEffect(() => {
        if (objectAgenda) {
            console.log('Agenda atualizada:', objectAgenda.uid_da_agenda);
        }
    }, [objectAgenda]);



    const enterInAgenda = async () => {
        const data = await getAgendaByCode();
        if (data) {
            console.log(data.uid_da_agenda)
            setObjectAgenda(data)

        }

        const urlAddAgenda = `${process.env.EXPO_PUBLIC_API_URL}/add/agenda/membro?uid_da_agenda=${data?.uid_da_agenda}&uid_do_membro=${userUid}&api_key=${chave}`
        
        const response = await fetch(urlAddAgenda, {
            method: 'POST'
        });
        try {
            const json = await response.json();
            console.log('API response: ', json);
            handleClose();
            alert('Você entrou na agenda!')
        } catch (err) {
            console.log('erro ao entrar na agenda: ', err);
            throw err
        }

    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.text}>
                    <TouchableOpacity style={styles.close} onPress={handleClose}>
                        <Ionicons size={30} color={"purple"} name={"close"} />
                    </TouchableOpacity>
                    <Text style={styles.label}>Digite o código de convite:</Text>
                    <TextInput
                        style={styles.textInput}
                        value={inviteCode}
                        onChangeText={setInviteCode}
                        placeholder='Digite o código de convite da agenda'
                        placeholderTextColor={"gray"}
                        accessibilityLabel="Nome da Atividade"
                        nativeID="atividadeNameInput"
                    />
                </View>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}></Text>
                <FAB
                    icon="arrow-right"
                    label="Confirmar"
                    style={styles.button}
                    onPress={() => {
                        if (inviteCode === "") {
                            alert('Insira um código de convite!')
                        }
                        else {
                            enterInAgenda()
                        }
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: "3%",
        backgroundColor: "rgba(93, 93, 93, 0.5)",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    text: {
        width: "100%",
        alignItems: "center",
    },
    nameAgenda: {
        fontSize: 23,
        marginVertical: 15,
        fontWeight: 'bold'
    },

    close: {
        position: "absolute",
        top: -20,
        left: -5
    },

    content: {
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        padding: 15,
        backgroundColor: "#FFF",
        borderRadius: 8,
        paddingBottom: 30,
        paddingTop: 30,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "purple",
        marginTop: 15,
        borderRadius: 8,
        width: "100%",
        padding: 10
    },
    button: {
        color: '#FFF',
        backgroundColor: "#b686f4",
        height: 50,
        width: 150,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center"
    },

    btnText: {
        color: "#FFF",
        fontSize: 17,
        fontWeight: "bold"
    },
    label: {
        fontSize: 17
    }
})