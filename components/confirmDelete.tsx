import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";


type Props={
    finalRemove: ()=> void;
    handleClose: ()=> void
    data:{
        id: string
        uid_da_agenda: string
        nome_agenda: string;
        chave_de_convite: string;
        firstCreated: string;
    }
}

export  function ConfirmDel({ data, handleClose, finalRemove }:Props){
    

    return(
      <View style={styles.container}>
        <View style={styles.content}>
            <View style={styles.text}>
                <TouchableOpacity style={styles.close}onPress={handleClose}>
                    <Ionicons size={30} color={"purple"} name={"close"}/>
                </TouchableOpacity>
                <Text> Deseja realmente deletar a agenda:</Text>
                <Text style={styles.nameAgenda}>{data.nome_agenda}?</Text>
            </View>
            <Text style={{fontSize: 18, fontWeight: "bold"}}></Text>
            <TouchableOpacity style={styles.button} onPress={finalRemove}>
                <Text style={styles.btnText}>Deletar</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: "3%",
        backgroundColor: "rgba(93, 93, 93, 0.5)",
        flex:1,
        justifyContent:"center",
        alignItems: "center"
    },

    text:{
        width:"100%",
        alignItems:"center",
    },
    nameAgenda:{
        fontSize: 23,
        marginVertical: 15,
        fontWeight: 'bold'
    },

    close:{
        position:"absolute",
        top: -20,
        left: -5
    },

    content: {
        justifyContent: "center",
        alignItems:"center",
        width: "90%",
        padding: 15,
        backgroundColor: "#FFF",
        borderRadius: 6,
        paddingBottom: 30,
        paddingTop: 30,
    },

    button:{
        backgroundColor: "#b686f4",
        height:50,
        width: 150,
        borderRadius: 6,
        justifyContent: "center",
        alignItems:"center"
    },

    btnText:{
        color:"#FFF",
        fontSize:17,
        fontWeight:"bold"
    }
})