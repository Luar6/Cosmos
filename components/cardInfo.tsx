import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Task = {
    title: string;
    desc: string;
    mat: string;
    prof: string;
    date: Date;
};

type Props = {
    data: Task;
    closeView: () => void;
}

export default function TaskInfo({ data, closeView }: Props) {
    const date = data.date;
    const dateObj = new Date(date);
    const formatedDate = format(dateObj, 'dd/MM/yyyy HH:mm')

    return (
        <View style={styles.container}>
            <View style={styles.content}>

                <View style={styles.header}>
                    <TouchableOpacity onPress={closeView}>
                        <Ionicons size={30} color={"purple"} name="arrow-back-outline" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{data.title}</Text>
                </View>

                <Text style={styles.subtitle}>Descrição</Text>
                <View style={styles.wrapperDesc}>
                    <Text>{data.desc}</Text>
                </View>

                <Text style={styles.subtitle}>Professor</Text>
                <View style={styles.wrapper}>
                    <Text>{data.prof}</Text>
                </View>

                <Text style={styles.subtitle}>Matéria</Text>
                <View style={styles.wrapper}>
                    <Text>{data.mat}</Text>
                </View>

                <Text style={styles.subtitle}>Data</Text>
                <View style={styles.wrapper}>
                    <Text>{formatedDate}</Text>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: "3%",
        backgroundColor: "rgba(93, 93, 93, 0.5)",
        flex: 1,
        justifyContent: "center"
    },

    header: {
        flexDirection: "row",
        height: 40,
        elevation: 10,
        marginBottom: 20,
        alignItems: "center",
        gap: 10,
    },

    headerTitle: {
        fontSize: 22
    },

    content: {
        justifyContent: "center",
        padding: 15,
        backgroundColor: "#FFF",
        borderRadius: 6,
        paddingBottom: 30
    },

    wrapper: {
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
        borderColor: "purple"
    },

    wrapperDesc: {
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
        borderColor: "purple",
        height: 100
    },

    subtitle: {
        fontSize: 17,
        color: "purple",
        marginTop: 10,
    }
})