import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FAB, TextInput } from 'react-native-paper';

type Props = {
    data: {
        id: string
        uid_da_agenda: string
        nome_agenda: string;
        chave_de_convite: string;
        firstCreated: string;
    };
    handleClose: () => void
}

export function AddTaskToAgenda({ handleClose, data }: Props) {
    const [nameTask, setNameTask] = useState('');
    const [loading, setLoading] = useState(false);

    const cadastrarAtividade = async () => {
        const uid = encodeURIComponent(data.id);
        const name = encodeURIComponent(nameTask);
        const chave = encodeURIComponent(process.env.EXPO_PUBLIC_API_KEY ?? ' ');
        const url = `${process.env.EXPO_PUBLIC_API_URL}/add/agenda/tarefa?uid_da_agenda=${uid}&nome_da_tarefa=${name}&api_key=${chave}`;

        try {
            const response = await fetch(url, {
                method: "POST",
            });
            const json = await response.json();
            console.log("resposta da api: ", json);
        } catch (error) {
            console.log('erro ao cadastrar: ', error);
            throw error
        }
    }

    async function saveAndClose() {
        if (loading) return;

        setLoading(true);
        try {
            await cadastrarAtividade();
            console.log('atividade salva!')
            handleClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleClose}>
                    <Ionicons size={30} color={"purple"} name="arrow-back-outline" />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>Criar Tarefa</Text>
            </View>
            <View style={{ gap: 20 }}>
                <View>
                    <Text style={styles.titleInput}>Nome</Text>
                    <TextInput
                        placeholder='Digite o nome da atividade'
                        placeholderTextColor={"gray"}
                        mode='outlined'
                        value={nameTask}
                        onChangeText={setNameTask}
                        accessibilityLabel="Nome da Atividade"
                        nativeID="atividadeNameInput"
                    />
                </View>
            </View>
            <FAB
                icon="arrow-right"
                label="Confirmar"
                onPress={() => {
                    if (nameTask == "") {
                        alert('Ponha um nome para a atividade!')
                    }
                    else {
                        saveAndClose()
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
        alignItems: 'center',
        gap: 10,
        paddingBottom: 30,
        height: 80
    },
    pageTitle: {
        fontSize: 25
    },
    textInput: {
        width: "99%",
        height: 47,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderColor: "rgba(96, 39, 170, 0.6)",
        backgroundColor: '#FFF',
        borderRadius: 4
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
        fontSize: 17
    }
})