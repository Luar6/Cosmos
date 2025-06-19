import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native"
import { useState } from "react";
import { SafeAreaView } from   'react-native-safe-area-context';
import { CreateTask } from './components/taskPage';
import { Ionicons } from "@expo/vector-icons";

export function Home(){
    const [task, setViewTask] = useState(false);
    
    function turnVisible(){
        return setViewTask(true);
    }

    return(
        <View style={styles.container}>
            <SafeAreaView style={{flex:1}}>
                <View style={styles.header}>
                    <Text style={styles.title}>Cosmos</Text>
                </View>
                <View style={styles.content}>
                    <Ionicons size={25} color={"gray"} name={"document-text"}/>                    
                    <Text style={styles.default}>Nada aqui. Para adicionar alguma tarefa, pressione o botão abaixo.</Text>
                </View>
                <TouchableOpacity onPress={turnVisible} style={styles.button}> <Text style={styles.buttonText}>+</Text> </TouchableOpacity>
                <Modal visible={task} animationType="fade">
                    <CreateTask closeView={()=> setViewTask(false)}/>
                </Modal>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "purple",
        flex:1
    },

    header:{
        height: 80,
        backgroundColor: "purple",
        justifyContent: "center",
        paddingLeft: "3%"
    },
    
    title:{
        fontSize: 23,
        fontWeight: "bold",
        color: "#FFF"
    },

    content:{
        height:"100%",
        alignItems: "center",
        justifyContent:"center",
        padding: "2%",
        backgroundColor:"#FFF"
    },

    default:{
        color:"gray",
        width:300,
        textAlign:"center"
    },

    button:{
        height:50,
        width:50,
        backgroundColor: "rgba(131, 52, 235, 0.6)",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        position:"absolute",
        right:20,
        bottom: 20,
    },

    buttonText:{
        color:"#FFF",
        fontSize: 20,
        elevation: 10,
        shadowColor: "#000",
    }
})