import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function Login() {
    return (
        <LinearGradient
            colors={['#BA43CE', '#6900FD']}
            style={styles.container}
        >
            <View style={styles.content}>
                <Image
                    style={{ width: 70, height:70 }} 
                    source={require('../../assets/images/icon.png')} />
                <Text style={styles.title}>Cosmos</Text>
            </View>
            <TouchableOpacity style={styles.googleBtn}>
                <Image 
                    source={require('../../assets/images/logo-google.png')}
                    style={{width: 20, height:20}}    
                />
                <Text style={styles.btnText}>Continuar com o Google</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        alignItems: "center"

    },
    content:{
        flexDirection:"row",
        alignItems:"center",
        gap: 10
    },
    title:{
        color:"#FFF",
        fontSize: 50,
        fontWeight: '500'
    },
    googleBtn:{
        flexDirection:"row",
        marginTop: 40,
        backgroundColor: "#FFF",
        height: 40,
        width:220,
        justifyContent:"center",
        alignItems:"center",
        gap: 10,
        borderRadius: 8
    },
    btnText:{
        fontSize: 15,        
        fontWeight: '500',
        color: "gray"
    }
})