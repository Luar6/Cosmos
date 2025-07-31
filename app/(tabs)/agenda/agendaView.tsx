import { AddTaskToAgenda } from '@/components/addTaskToAgenda';
import { ConfigAgenda } from '@/components/configAgenda';
import { PublicTaskItem } from '@/components/publicAgendaItem';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
    data: {
        id: string
        uid_da_agenda: string
        nome_agenda: string;
        chave_de_convite: string;
        firstCreated: string;
    };
    handleClose: () => void
};

type Task = {
    id: string;
    nome_da_tarefa: string;
    timestamp: string;
};

export default function ViewAgenda({ data, handleClose }: Props) {

    const [configVisible, setConfigVisible] = useState(false);
    const [addTaskVisible, setAddTaskVisible] = useState(false);
    const [arrayAgendaTasks, setArrayAgendaTasks] = useState<Task[]>([])

    const chave = encodeURIComponent(process.env.EXPO_PUBLIC_API_KEY ?? '');

    const loadTasks = async (): Promise<Task[]> => {
        const url = `${process.env.EXPO_PUBLIC_API_URL}/getAllTarefasFromOneAgenda?uid_da_agenda=${data.id}&api_key=${chave}`;

        try {
          const response = await fetch(url);
          if (!response.ok) {
            const errorData = await response.json();
            console.log(`API error: ${response.status} - ${JSON.stringify(errorData)}`);
            return [];
          }

          const result = await response.json();
          console.log("Raw API result:", result);

          const tasksArray: Task[] = Object.entries(result)
            .map(([id, value]: [string, any]) => ({
              id,
              ...value
            }))
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

          console.log("Sorted tasks:", tasksArray);

          return tasksArray;
        } catch (err) {
          console.log('Erro ao puxar os dados:', err);
          return [];
        }
    };

    useEffect(() => {
        async function useLoad() {
            const array: Task[] = await loadTasks();
            setArrayAgendaTasks(array);
        }
        useLoad();
    },[]);

    console.log("arrayAgendaTasks state:", arrayAgendaTasks);

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>

            <View style={styles.header}>
                <Pressable onPress={handleClose}>
                    <Ionicons color={"purple"} size={30} name={"arrow-back-outline"} />
                </Pressable>
                <Pressable onPress={() => setConfigVisible(true)} style={styles.agendaConfig}>
                    <Text style={styles.title}>{data.nome_agenda}</Text>
                </Pressable>
                <Modal animationType="slide" visible={configVisible}>
                    <ConfigAgenda closeAll={handleClose} handleClose={() => setConfigVisible(false)} data={data} />
                </Modal>
            </View>
            <FlatList
                data={arrayAgendaTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <PublicTaskItem data={item} />}
            />

            <View style={{ flex: 1 }}>
                <Modal animationType='slide' visible={addTaskVisible} onRequestClose={() => setAddTaskVisible(false)}>
                    <AddTaskToAgenda
                        data={data}
                        handleClose={() =>{
                            setAddTaskVisible(false);
                        }}
                    />
                </Modal>

                <FAB
                    icon="plus"
                    onPress={() => setAddTaskVisible(true)}
                    style={styles.button}
                />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        margin: 0
    },
    header: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        height: 80,
    },
    title: {
        fontSize: 25
    },
    agendaConfig: {
        flex: 1,
    },
    button: {
        position: 'absolute',
        right: 16,
        bottom: 16,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 20,
        textAlign: "center",
        textAlignVertical: "center",
        lineHeight: 50,
        elevation: 10,
        shadowColor: "#000",
    },
})