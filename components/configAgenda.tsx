import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import { useState } from 'react';
import { ConfirmDel } from './confirmDelete';
import { format } from 'date-fns';
import * as Clipboard from 'expo-clipboard';

type Props = {
    data: {
        id: string
        uid_da_agenda: string
        nome_agenda: string;
        chave_de_convite: string;
        firstCreated: string;
    };
    handleClose: () => void
    closeAll: () => void
}

export function ConfigAgenda({ closeAll, data, handleClose }: Props) {
    const [viewDel, setViewDel] = useState(false)
    const date = data.firstCreated
    const dateObj = new Date(date);
    const formatedDate = format(dateObj, 'dd/MM/yyyy HH:mm');
    const link = `${data.chave_de_convite}`
    const copyLink = async() =>{
        await Clipboard.setStringAsync(link);
        alert('Link de convite copiado!');
    }    

    const deletarAgenda = async () => {
        const uid = encodeURIComponent(data.id); // ou data.uid_da_agenda, conforme a API espera
        const chave = encodeURIComponent(process.env.EXPO_PUBLIC_API_KEY ?? '');
        const url = `${process.env.EXPO_PUBLIC_API_URL}/delete/agenda?uid_da_agenda=${uid}&api_key=${chave}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Erro: ${response.status} - ${text}`);
            }

            console.log("Agenda deletada com sucesso!");
        } catch (error) {
            console.log("Erro ao deletar a agenda:", error);
        }
    };


    async function deleteAndClose() {
        await deletarAgenda();
        console.log('operação finalizada');
        closeAll();
    }

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
                        <Ionicons size={25} color="gray" name="pencil" />
                    </Pressable>
                </View>
                <View style={styles.content}>
                    <Text ellipsizeMode='head' numberOfLines={1} style={styles.data}>Copiar código de convite</Text>
                    <TouchableOpacity onPress={copyLink}>
                        <Ionicons color={'gray'} size={24} name='copy-outline'/>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentBorderBottom}>
                    <Text style={styles.data}>Agenda criada em: {formatedDate}</Text>
                </View>
                <View style={styles.commands}>
                    <TouchableOpacity onPress={()=>setViewDel(true)} style={styles.delete}>
                        <Text style={styles.delText}>Deletar agenda</Text>
                        <Ionicons size={20} color="red" name='trash-outline' />
                    </TouchableOpacity>
                </View>
                <Modal animationType='fade' transparent={true} visible={viewDel}>
                    <ConfirmDel data={data} handleClose={()=>setViewDel(false)} finalRemove={deleteAndClose}/>
                </Modal>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
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
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center', 
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderWidth: 1,
        borderTopColor: "gray",
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomColor: "gray"
    },
    contentBorderBottom: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderWidth: 1,
        borderTopColor: "gray",
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomColor: "gray"
    },
    contentBorderTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderWidth: 1,     
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
        marginHorizontal: 15,
        marginVertical: 20
    },
    delete: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"

    },
    delText: {
        fontSize: 18,
        color: "red"
    }
})