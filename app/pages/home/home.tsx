import useStorage from "@/app/data/Storage";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskItem from "../components/modal";
import CreateTask from './components/taskPage';

type Task = {
    id: string
    title: string;
    desc: string;
    mat: string;
    prof: string;
    date: Date;
}

export default function Home() {
    const [task, setViewTask] = useState(false);
    const [taskList, setTaskList] = useState<Task[]>([]);
    const { get, remove } = useStorage();
    const focused = useIsFocused();

    async function load() {
        const tasks = await get("1")
        setTaskList(tasks)
    }

    useEffect(() => {
        load()
    }, [focused])

    function turnVisible() {
        return setViewTask(true);
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
                <View style={styles.header}>
                    <Text style={styles.title}>Cosmos</Text>
                </View>
                <View style={styles.content}>
                    {
                        taskList && taskList.length > 0 ? (
                            <View>
                                <Text style={{ color: "gray", padding: 6 }}>Atividades individuais</Text>
                                <FlatList
                                    data={taskList}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => <TaskItem removeItem={async () => {
                                        const tasks = await remove("1", item.id)
                                        setTaskList(tasks ?? [])
                                    }} data={item} />}
                                />
                            </View>
                        ) : (
                            <View style={styles.defaultContent}>
                                <Ionicons size={25} color={"gray"} name={"document-text"} />
                                <Text style={styles.default}>Nada aqui. Para adicionar alguma tarefa, pressione o botão abaixo.</Text>
                            </View>
                        )}

                </View>
                <TouchableOpacity onPress={turnVisible} style={styles.button}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <Modal visible={task} animationType="fade">
                    <CreateTask closeView={() => {
                        setViewTask(false);
                        load();
                    }} />
                </Modal>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        flex: 1,
        padding: 0,
        margin: 0
    },

    header: {
        height: 120,
        marginBottom: 30,
        backgroundColor: "purple",
        justifyContent: "flex-end",
        paddingBottom: "5%",
        paddingLeft: "3%"
    },

    title: {
        fontSize: 23,
        fontWeight: "bold",
        color: "#FFF"
    },

    content: {
        flex: 1,
        backgroundColor: "#FFF",
        padding: "2%",
        margin: 0,
    },

    defaultContent: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },

    default: {
        color: "gray",
        width: 300,
        textAlign: "center"
    },

    button: {
        height: 50,
        width: 50,
        backgroundColor: "#b686f4",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        position: "absolute",
        right: 20,
        bottom: 20,
    },

    buttonText: {
        color: "#FFF",
        fontSize: 20,
        textAlign: "center",
        textAlignVertical: "center",
        lineHeight: 50,
        elevation: 10,
        shadowColor: "#000",
      }


})