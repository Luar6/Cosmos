
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AgendaItem from "./components/agendaItem";
import CreateAgenda from "./createGroup";
import { useIsFocused } from "@react-navigation/native";
import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';

type Agendas = {
    nome_agenda: string
    chave_de_convite: string
    firstCreated: string
}

export default function Agenda() {
    const [userUid, setUserUid] = useState<string | null>(null);

    useEffect(() => {
        const auth = getAuth(getApp());
        setUserUid(auth.currentUser?.uid ?? null);
    }, []);

    const url = `${process.env.EXPO_PUBLIC_API_URL}/getAllAgendasLinkedToUser?uid_do_responsavel=${userUid}&api_key=${process.env.EXPO_PUBLIC_API_KEY}`;
    const [agendas, setAgendas] = useState<Agendas[]>([]);
    const [visibleCreateGroup, setVisibleCreate] = useState(false);
    const focused = useIsFocused();

    const fetchAgendas = () => {
        fetch(url)
          .then(async response => {
            if (!response.ok) {
              const errorText = await response.text();
              setAgendas([]);
              throw new Error(`${response.status} - ${errorText}`);
            } else {
              return response.json();
            }
          })
          .then(data => {
            console.log("Fetched data:", data);
            setAgendas(data);
            console.log("req done!")
          })
          .catch(err => {
            console.log("Erro na requisição: " + err);
          });
    };

    useEffect(()=>{
        if (!focused) return;
        fetchAgendas();
    }, [focused])

    const agendaArray = Object.entries(agendas).map(([id, value]) => ({
        id,
        ...value,
    })).sort((a, b) => new Date(b.firstCreated).getTime() - new Date(a.firstCreated).getTime());

    /*
    console.log(agendas)
    console.log(Object.keys(agendas).length)
    console.log(agendaArray)
     */

    const onAgendaCreated = () => {
        fetchAgendas();
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
                <View style={styles.content}>
                    {
                        agendas && Object.keys(agendas).length > 0 ? (
                            <View style={{ flex: 1, width: '100%' }}>
                                <FlatList
                                    data={agendaArray}
                                    renderItem={({item})=>(
                                        <AgendaItem data={item}/>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
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

                <Modal animationType="fade" visible={visibleCreateGroup}>
                    <CreateAgenda handleClose={()=> setVisibleCreate(false)} onCreated={onAgendaCreated}/>
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
    }
})