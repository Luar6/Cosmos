import {Text, View} from 'react-native'

type Props={
    data: {
        nome: string
        uID_adm: string
        api_key: string
    }
}
export function AgendaItem({data}: Props){
    return(
        <View>
            <Text>{data.nome}</Text>
        </View>
    )    
}