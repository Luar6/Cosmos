import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TaskInfo } from './cardInfo';
import { TaskDel } from "./cardDel";

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

export function TaskItem({ data, removeItem }: Props) {

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
        <View style={styles.content}>
            <TouchableOpacity onPress={turnInfoVisible} style={styles.button}>
                <Text style={styles.text}>{data.title}</Text>

                <TouchableOpacity style={{ justifyContent: "center", height: "100%" }} onPress={turnDelVisible}>
                    <Ionicons size={18} color={"white"} name={"trash-bin-outline"} />
                </TouchableOpacity>
            </TouchableOpacity>

            <Modal animationType="fade" transparent={true} visible={delView}>
                <TaskDel delItem={()=>{removeItem(data.id)}} data={data} closeView={() => setDelView(false)} />
            </Modal>

            <Modal animationType="fade" transparent={true} visible={infoView}>
                <TaskInfo data={data} closeView={() => setInfoView(false)} />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        width: "100%"
    },

    button: {
        margin: 5,
        height: 50,
        backgroundColor: "#005eff",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        borderRadius: 5,
        flexDirection: "row"
    },

    text: {
        color: "#FFF",
        fontWeight: "bold"
    },
})