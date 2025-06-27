import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from   'react-native-safe-area-context';

export function Agenda(){

    return(
        <View style={styles.container}>
            <SafeAreaView style={{flex:1}}>
                <View style={styles.header}>
                    <Text style={styles.title}>Cosmos</Text>
                </View>
                <View style={styles.content}>
                    <Ionicons size={25} color={"gray"} name={"person-add"}/>
                    <Text style={styles.default}>Você ainda não possui nenhuma agenda compartilhada! Adicione uma logo abaixo.</Text>
                </View>
                
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
        textAlign:"center",
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