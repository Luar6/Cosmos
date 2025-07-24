
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AgendaItem from "./components/agendaItem";
import CreateAgenda from "./createGroup";
import { useIsFocused } from "@react-navigation/native";

type Agendas = {
    nome_agenda: string
    user_Id: string
    chave_de_convite: string
}

export default function Agenda() {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/getAllAgendas?api_key=${process.env.EXPO_PUBLIC_API_KEY}`;
    const [agendas, setAgendas] = useState<Agendas[]>([]);
    const [visibleCreateGroup, setVisibleCreate] = useState(false);
    const focused = useIsFocused();

    useEffect(()=>{
        if (!focused) return;
        fetch(url)
            .then(response=>{
                if(!response.ok){
                    console.log(url)
                    throw new Error("erro ao realizar a requisição");
                }     
                return response.json();        
            })
            .then(data=>{
                console.log("Fetched data:", data);
                const arrayAgenda = Object.values(data) as Agendas[];
                setAgendas(arrayAgenda)
            })
            .catch(err=>{
                console.log("Erro na requisição: "+ err)
            })
    }, [focused])

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
                <View style={styles.content}>
                    {
                        agendas && agendas.length > 0 ? (
                            <View style={styles.schedules}>
                                <FlatList
                                    data={agendas}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({item})=>(
                                        <AgendaItem data={item}/>
                                    )}
                                />
                            </View>
                        ) : (
                            <View style={styles.default}>
                                <Ionicons size={25} color={"gray"} name={"person-add"}/>
                                <Text style={styles.default}>Você ainda não está em nenhuma agenda! clique a baixo para criar uma e convidar seus colegas de classe.</Text>
                            </View>
                        )
                    }
                </View>

                <Modal animationType="slide" visible={visibleCreateGroup}>
                    <CreateAgenda handleClose={()=> setVisibleCreate(false)}/>
                </Modal>

                <TouchableOpacity onPress={()=> setVisibleCreate(true)} style={styles.btnCreate}>
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

    content: {
        flex: 1,
        backgroundColor: "#FFF",
        justifyContent:"center",
        alignItems:"center",
        margin: 0,
    },

    default: {
        alignItems: "center",
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
    },
    schedules:{
        flex: 1,
        width:"100%",
        margin:0,
    }
})