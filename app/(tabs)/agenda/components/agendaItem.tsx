import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'

type Props={
    data: {
        nome_agenda: string
        chave_de_convite: string
    }
}
export default function AgendaItem({data}: Props){
    return(
        <TouchableOpacity style={styles.container}>
            <Text style={styles.data}>{data.nome_agenda}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        height: 100,
        width: "90%",
        justifyContent: "flex-start",
        backgroundColor: "purple",
        marginVertical:"5%",
        borderRadius: 18,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 40 },
        shadowOpacity: 0.3,
        shadowRadius: 2,

        elevation: 20,
        marginHorizontal: "5%"
    },
    data:{
        marginLeft: 20,
        marginTop: 20,
        fontSize: 20,
        color:"#FFF",
        fontWeight: "500"
        
    }
})