import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AddTaskToAgenda } from './components/addTaskToAgenda';
import { ConfigAgenda } from './components/configAgenda';
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

export function ViewAgenda({ data, handleClose }: Props) {
    
    const [configVisible, setConfigVisible] = useState(false);
    const [addTaskVisible, setAddTaskVisible] = useState(false);

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
                    <ConfigAgenda handleClose={() => setConfigVisible(false)} data={data} />
                </Modal>
            </View>
            
            <View style={{flex: 1}}>
                <Modal animationType='slide' visible={addTaskVisible}>
                    <AddTaskToAgenda data={data} handleClose={() => setAddTaskVisible(false)} />
                </Modal>
                <TouchableOpacity onPress={()=> setAddTaskVisible(true)} style={styles.button}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
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
        position: "absolute",
        right: 20,
        bottom: 20,
        height: 50,
        width: 50,
        backgroundColor: "#b686f4",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
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