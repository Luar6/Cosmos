import {Text, View} from 'react-native'

type Props={
    data: {
        nome_agenda: string
        uid_do_responsável: string
        chave_de_convite: string
    }
}
export default function AgendaItem({data}: Props){
    return(
        <View>
            <Text>{data.nome_agenda}</Text>
        </View>
    )
}