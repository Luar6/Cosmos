import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import useStorage from '@/data/Storage';
type Props = {
    closeView: () => void;
};

type Task = {
    id:string;
    title: string;
    desc: string;
    mat: string;
    prof: string;
    date: Date;
}

export default function CreateTask({ closeView }: Props) {

    const { save } = useStorage()

    // variáveis de definição de data
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    // valores dos campos de texto
    const id = Date.now().toString()
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [mat, setMat] = useState('');
    const [prof, setProf] = useState('');

    async function saveTask (): Promise<void>{
        const task:Task = {id,title,desc,mat,prof,date};
        await save("1", task);
        closeView();
    }

    const handleChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (event.type === 'set' && selectedDate) {
            setDate(selectedDate);
        }
        setShowDate(false);
    }

    const handleChangeTime = (event: DateTimePickerEvent, selectedDate?: Date): void => {
        if (event.type === 'set' && selectedDate) {
            setDate(selectedDate);
        }
        setShowTime(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={closeView}>
                    <Ionicons size={30} color={"purple"} name="arrow-back-outline" />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>Criar Tarefa</Text>
            </View>

            <View style={styles.content}>
                <View>
                    <Text style={styles.tytleInput}>Nome</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Digite o nome da tarefa'
                        placeholderTextColor={"gray"}
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>
                <View>
                    <Text style={styles.tytleInput}>Descrição</Text>
                    <TextInput
                        style={styles.textInputDescription}
                        placeholder='Digite a descrição da tarefa'
                        placeholderTextColor={"gray"}
                        multiline
                        textAlignVertical='top'
                        value={desc}
                        onChangeText={setDesc}
                    />
                </View>

                <View>
                    <Text style={styles.tytleInput}>Matéria</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Digite o nome da matéria'
                        placeholderTextColor={"gray"}
                        value={mat}
                        onChangeText={setMat}
                    />
                </View>

                <View>
                    <Text style={styles.tytleInput}>Professor</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Digite o nome do Professor'
                        placeholderTextColor={"gray"}
                        value={prof}
                        onChangeText={setProf}
                    />
                </View>

                <View style={styles.contentInputDate}>
                    <Text style={styles.tytleInput}>Data</Text>
                    <TouchableOpacity
                        style={styles.dateBtn}
                        onPress={() => setShowDate(true)}>
                            <Text>{date.toLocaleDateString()}</Text>
                    </TouchableOpacity>

                    <Text style={styles.tytleInput}>Hora</Text>
                    <TouchableOpacity
                        style={styles.dateBtn}
                        onPress={() => setShowTime(true)}>
                            <Text>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    </TouchableOpacity>

                    {showDate && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={handleChangeDate}
                        />
                    )}

                    {showTime && (
                        <DateTimePicker
                            value={date}
                            mode="time"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={handleChangeTime} // <- idem
                        />
                    )}
                </View>
            </View>

            <TouchableOpacity onPress={()=>{
                if(title || desc || mat || prof == ""){
                    alert('Ponha todas as informações');
                }else{
                    saveTask();
                }
            }} style={styles.button}>
                <Ionicons size={17} color={"#FFF"} name={"arrow-forward-outline"}/>
                <Text style={styles.buttonText}>Criar</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "3%"
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingBottom: 30,
        height: 80
    },

    content: {
        gap: 20
    },

    pageTitle: {
        fontSize: 25
    },

    tytleInput: {
        paddingLeft: 15,
        color: "rgba(96, 39, 170, 0.6)"
    },

    textInputDescription: {
        width: "99%",
        height: 117,
        paddingLeft: 15,
        paddingTop: 15,
        borderWidth: 1,
        borderColor: "rgba(96, 39, 170, 0.6)",
        borderRadius: 4
    },

    textInput: {
        width: "99%",
        height: 47,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderColor: "rgba(96, 39, 170, 0.6)",
        borderRadius: 4
    },

    contentInputDate: {
        flexDirection:"row",
    },

    dateBtn:{
        flex:1,
        borderWidth:1,
        margin:5,
        padding:10,
        borderColor: "rgba(96, 39, 170, 0.6)",
        borderRadius:4,
    },

    button:{
        height:50,
        width:100,
        gap: 10,
        backgroundColor: "#b686f4",
        flexDirection:"row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        position:"absolute",
        right:20,
        bottom: 20,
    },

    buttonText:{
        color:"#FFF",
        fontSize: 17
    }
})
