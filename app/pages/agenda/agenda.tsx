
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";


export function Agenda() {
    const url="https://cosmos-api-two.vercel.app/docs"
    const[agendas, setAgendas] = useState([]);
    useEffect(()=>{
        fetch(url)
            .then(response=>{
                if(!response.ok){
                    throw new Error("erro ao realizar a requisição");
                }
                else{
                    return response.json();
                }
            }) 
            .then(data=>{
                setAgendas(data);
            })
            .catch(err=>{
                console.log("Erro na requisição: "+ err)
            })
    }, []) 

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
                <View style={styles.header}>
                    <Text style={styles.title}>Cosmos</Text>
                </View>
                <View style={styles.content}> 
                    <Ionicons size={25} color={"gray"} name={"person-add"}/>
                    <Text style={styles.default}>Você ainda não está em nenhuma agenda! clique a baixo para criar uma e convidar seus colegas de classe.</Text>
                </View>           
                <TouchableOpacity style={styles.btnCreate}>
                    <Text style={styles.btnCreateTxt}>Criar um Grupo</Text>
                    </TouchableOpacity>
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
        justifyContent:"center",
        alignItems:"center",
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

    btnCreate:{
        position: "absolute",
        right:20,
        bottom:20,
        width: 150,
        height: 50,
        backgroundColor:"#b686f4",
        justifyContent:"center",
        alignItems:"center",
        borderRadius: 15,
    },

    btnCreateTxt:{
        color:"#FFF",
        fontWeight:"bold"
    }
})