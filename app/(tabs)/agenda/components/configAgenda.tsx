import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    data: {
        id: string
        nome_agenda: string;
        chave_de_convite: string;
        firstCreated: string;
    };
    handleClose: () => void
}

export function ConfigAgenda({ data, handleClose }: Props) {
    const uid = encodeURIComponent(data.id);
    const name = encodeURIComponent(data.nome_agenda);
    const chave = encodeURIComponent(process.env.EXPO_PUBLIC_API_KEY ?? ' ')
    const url= `${process.env.EXPO_PUBLIC_API_URL}/update/agenda?uid_da_agenda=${uid}&nome_agenda=${name}&api_key=${chave}`
    useEffect(()=>{
        fetch(url)
            .then(response=>{
                if(!response.ok){
                    const errorText = response.text();
                    throw new Error(`${response.status} - ${errorText}`);
                }
                return response.json();
            })
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={handleClose}>
                    <Ionicons color={"purple"} size={30} name={"arrow-back-outline"} />
                </Pressable>
                <Text style={styles.title}>Configurações da Agenda</Text>
            </View>
            <View style={styles.wrapper}>
                <View style={styles.contentBorderTop}>
                    <Text style={styles.data}>{data.nome_agenda}</Text>
                    <Pressable>
                        <Ionicons size={25} color="gray" name="pencil"/>
                    </Pressable>
                </View>
                <View style={styles.content}>
                    <Text  style={styles.data}>{data.chave_de_convite}</Text>
                </View>
                <View style={styles.contentBorderBottom}>
                    <Text style={styles.data}>{data.firstCreated}</Text>
                </View>
                <View style={styles.commands}>
                    <TouchableOpacity style={styles.delete}>
                        <Text style={styles.delText}>Deletar agenda</Text>
                        <Ionicons size={20} color="red" name='trash-outline' />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        margin: 0
    },
    header: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        height: 80,
    },
    title: {
        fontSize: 25
    },
    wrapper: {
        flex: 1,
    },

    content: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderWidth: 1,
        marginHorizontal: 10,
        borderTopColor: "gray",
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomColor: "gray"
    },
    contentBorderBottom: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderWidth: 1,
        marginHorizontal: 10,
        borderTopColor: "gray",
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomColor: "gray"
    },
    contentBorderTop: {
        flexDirection: "row",
        justifyContent:"space-between",
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderWidth: 1,
        marginHorizontal: 10,
        borderTopColor: "gray",
        borderBottomWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomColor: "gray"
    },

    data: {
        fontSize: 18,
        color: "gray"
    },
    commands: {
        justifyContent: "flex-end",
        marginHorizontal:15,
        marginVertical: 20
    },
    delete: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"

    },
    delText: {
        fontSize:18,
        color: "red"
    }
})