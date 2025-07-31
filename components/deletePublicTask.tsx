import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { FAB } from 'react-native-paper';

type Task = {
    id: string;
    nome_da_tarefa: string;
    timestamp: string;
};

type Props={
    data: Task;
    handleClose: ()=> void
    finalRemove: ()=> void
}

export function DelPublicTask({data, handleClose, finalRemove}:Props){

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.text}>
                    <TouchableOpacity style={styles.close} onPress={handleClose}>
                        <Ionicons size={30} color={"purple"} name={"close"} />
                    </TouchableOpacity>
                    <Text style={styles.label}>Deseja realmente deletar:</Text>
                    <Text style={styles.nameTask}>{data.nome_da_tarefa}?</Text>
                </View>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}></Text>
                <FAB
                    icon="arrow-right"
                    label="Confirmar"
                    style={styles.button}
                    onPress={finalRemove}
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
    nameTask: {
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