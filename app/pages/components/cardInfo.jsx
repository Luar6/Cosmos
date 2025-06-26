import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export function TaskInfo({data, closeView}){
    
    return(
      <View style={styles.content}>
        <View styles={styles.header}>
            <TouchableOpacity onPress={closeView}> <Ionicons size={30} color={"purple"} name="arrow-back-outline" /></TouchableOpacity>
            <Text>{data.title}</Text>
        </View>

        <View styles={styles.container}>
            <Text>Descrição</Text>
            <Text>{data.desc}</Text>
        </View>
      </View>  
    )
}

const styles = StyleSheet.create({
    content: {
        width:"80%",
        height:"80%",
        padding: "3%"
    },

    header:{
        flexDirection:"row",

    },
    container: {
        justifyContent: "center",
        paddingTop:5,
        paddingBottom:5
    },
})