import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import TaskInfo from './cardInfo';
import TaskDel from "./cardDel";

type Task = {
    id: string;
    title: string;
    desc: string;
    mat: string;
    prof: string;
    date: Date;
};

type Props = {
    data: Task;
    removeItem: (id: string) => void;
};

export default function TaskItem({ data, removeItem }: Props) {
    const [infoView, setInfoView] = useState(false);
    const [delView, setDelView] = useState(false);

    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => setInfoView(true)}
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
                        {data.title}
                    </Text>

                    <TouchableOpacity
                        onPress={() => setDelView(true)}
                        style={styles.iconWrapper}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Ionicons
                            name="trash-bin-outline"
                            size={22}
                            color={colors.onPrimary}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            <Modal animationType="fade" transparent visible={delView}>
                <TaskDel delItem={() => removeItem(data.id)} data={data} closeView={() => setDelView(false)} />
            </Modal>

            <Modal animationType="fade" transparent visible={infoView}>
                <TaskInfo data={data} closeView={() => setInfoView(false)} />
            </Modal>
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
