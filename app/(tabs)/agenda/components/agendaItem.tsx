import {Text, View, StyleSheet } from 'react-native'

type Props={
    data: {
        nome_agenda: string
        chave_de_convite: string
    }
}
export default function AgendaItem({data}: Props){
    return(
        <View style={styles.container}>
            <Text>{data.nome_agenda}</Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: "99%",
        backgroundColor: "gray"
    }
})