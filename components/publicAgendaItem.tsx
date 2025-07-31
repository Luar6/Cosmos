import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { DelPublicTask } from "./deletePublicTask";

type Task = {
    id: string;
    nome_da_tarefa: string;
    timestamp: string;
};

type Agenda = {
    id: string
    uid_da_agenda: string
    nome_agenda: string
    chave_de_convite: string
    firstCreated: string
};

type Props = {
    data: Task;
    agendaData: {
        id: string
        uid_da_agenda: string
        nome_agenda: string;
        chave_de_convite: string;
        firstCreated: string;
    }
};

export function PublicTaskItem({ agendaData, data }: Props) {
    const [delView, setDelView] = useState(false);
    const { colors } = useTheme();
    const chave = encodeURIComponent(process.env.EXPO_PUBLIC_API_KEY ?? '');

    console.log(`AgendaData: ${JSON.stringify(agendaData)}`)

    const deletarTask = async () => {
        try {
            const url = `${process.env.EXPO_PUBLIC_API_URL}/delete/agenda/tarefa?uid_da_agenda=${agendaData.id}&uid_da_tarefa=${data.id}&api_key=${chave}`
            const response = await fetch(url, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.log(`API error: ${response.status} - ${JSON.stringify(errorData)}`);
            }
            console.log('tarefa deletada!');
        } catch (err) {
            console.log('erro ao deletar a tarefa: ', err)
        }
    }

    const setDeleteAndClose = async () => {
        await deletarTask();
        console.log('operação finalizada');
        setDelView(false);
    }

    console.log(`Data do componente publicAgendaItem: ${JSON.stringify(data)}`)

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.85}
                style={[
                    styles.card,
                    {
                        backgroundColor: colors.primary,
                        borderColor: colors.primary,
                        shadowColor: colors.primary + "aa",
                    },
                ]}
            >
                <View style={styles.row}>
                    <Text style={[styles.title, { color: colors.onPrimary }]}>
                        {data.nome_da_tarefa}
                    </Text>

                    <TouchableOpacity
                        onPress={() => setDelView(true)}
                        style={styles.iconWrapper}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        {/*
                            Adicionar a função de remover no ícone da lixeira dentro do publicAgendaitem
                        */}
                        <Ionicons
                            name="trash-bin-outline"
                            size={22}
                            color={colors.onPrimary}
                        />
                    </TouchableOpacity>

                    <Modal visible={delView} transparent={true} animationType="fade">
                        <DelPublicTask data={data} finalRemove={setDeleteAndClose} handleClose={() => setDelView(false)} />
                    </Modal>
                </View>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "97%",
        alignSelf: "center",
    },
    card: {
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 16,
        marginVertical: 6,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        flexShrink: 1,
        paddingRight: 10,
    },
    iconWrapper: {
        padding: 6,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
});
