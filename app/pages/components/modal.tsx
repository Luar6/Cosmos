import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, Pressable } from "react-native"
import { Ionicons } from "@expo/vector-icons";

type Task = {
  title: string;
  desc: string;
  mat: string;
  prof: string;
  date: Date;
};

type Props = {
    data:Task;
    removeItem: ()=> void;
}

export function TaskItem({data, removeItem}:Props){
    
    return(
      <View style={styles.content}>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>{data.title}</Text>

            <TouchableOpacity style={{justifyContent:"center",height: "100%"}} onPress={removeItem}>
                <Ionicons size={18} color={"white"} name={"trash-bin-outline"}/>
            </TouchableOpacity>
        </TouchableOpacity>      
      </View>  
    )
}

const styles = StyleSheet.create({
    content:{
        width: "100%"
    },

    button:{
        margin: 5,
        height: 50,
        backgroundColor: "#005eff",
        alignItems:"center",
        justifyContent: "space-between",
        padding: 10,
        borderRadius: 5,
        flexDirection:"row"
    },

    text:{
        color: "#FFF",
        fontWeight: "bold"
    },
})