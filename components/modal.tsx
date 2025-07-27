import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TaskInfo from './cardInfo';
import TaskDel from "./cardDel";

type Task = {
    id: string
    title: string;
    desc: string;
    mat: string;
    prof: string;
    date: Date;
};

type Props = {
    data: Task;
    removeItem: (id: string) => void;
}

export default function TaskItem({ data, removeItem }: Props) {

    const [infoView, setInfoView] = useState(false);
    const [delView, setDelView] = useState(false);

    function turnInfoVisible() {
        setInfoView(true);
    }

    function turnDelVisible() {
        setDelView(true);
    }
    //()=>{removeItem(data.id)}
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={turnInfoVisible} style={styles.button}>
                <View style={styles.content}>
                    <Text style={styles.text}>{data.title}</Text>
                    <TouchableOpacity style={{ alignItems: "center", height: "100%" }} onPress={turnDelVisible}>
                        <Ionicons size={25} color={"white"} name={"trash-bin-outline"} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            <Modal animationType="fade" transparent={true} visible={delView}>
                <TaskDel delItem={() => { removeItem(data.id) }} data={data} closeView={() => setDelView(false)} />
            </Modal>

            <Modal animationType="fade" transparent={true} visible={infoView}>
                <TaskInfo data={data} closeView={() => setInfoView(false)} />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "97%",
    },
    content: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button: {
        width: "100%",
        margin: 5,
        height: 80,
        backgroundColor: "purple",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        borderRadius: 15,
        flexDirection: "row",

        borderWidth: 1,
        borderColor: 'purple',
        shadowColor: '#57038fff',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3
    },

    text: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 20
    },
})