import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Task = {
  title: string;
  desc: string;
  mat: string;
  prof: string;
  date: Date;
};

type Props={
    data:Task;
    closeView: ()=> void;
    delItem: ()=> void;
}

export function TaskDel({data, closeView, delItem}:Props){
    function finalRemove(){
        delItem()
        closeView()
    }
    return(
      <View style={styles.container}>
        <View style={styles.content}>
            
            <View style={styles.text}>
                <TouchableOpacity style={styles.close}onPress={closeView}>
                    <Ionicons size={30} color={"purple"} name={"close"}/>
                </TouchableOpacity>
                <Text > Deseja realmente deletar a atividade:</Text>
            </View>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>{data.title}?</Text>
            <TouchableOpacity style={styles.button} onPress={finalRemove}><Text style={styles.btnText}>Deletar</Text></TouchableOpacity>
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
        marginTop: 20,
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