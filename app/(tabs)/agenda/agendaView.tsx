import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  data: {
    nome_agenda: string;
    chave_de_convite: string;
    firstCreated: string;
  };
  handleClose : ()=> void
};

export function ViewAgenda({data, handleClose}:Props){
    return(
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <View style={styles.header}>
                <Pressable onPress={handleClose}>
                    <Ionicons color={"purple"} size={30} name={"arrow-back-outline"}/>
                </Pressable>
                <Text style={styles.title}>{data.nome_agenda}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 0,
        margin: 0
    },
    header:{
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        height: 80,
    },
    title:{
        fontSize: 25
    }
})