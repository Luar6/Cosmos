import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
    const user = auth().currentUser;
    const router = useRouter();
    
    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            await auth().signOut();
            console.log('User signed out!');
            router.navigate('/');
        } catch (error) {
            console.error('Sign out error', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.data}>
                    {user?.photoURL ? (
                        <Image
                            source={{ uri: user.photoURL }}
                            style={{ width: 120, height: 120, borderRadius: 60 }}
                        />
                    ) : (
                        <Text>Sem foto</Text>
                    )}
                    <Text>{user?.displayName}</Text>
                    <Text>{user?.email}</Text>
                </View>
                <TouchableOpacity onPress={signOut} style={styles.signOutButton}>
                    <Text style={styles.buttonText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        flex: 1,
        padding: 0,
        margin: 0,
        alignItems: "center",
        justifyContent: "center"
    },

    content: {
        height: "50%",
        width: "80%",
        justifyContent: "center",
        backgroundColor: "#FFF",
        padding: "10%",
        margin: 0,
        borderRadius: 18,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 40 },
        shadowOpacity: 0.3,
        shadowRadius: 2,

        elevation: 15
    },

    data: {
        paddingBottom: 30,
        gap: 10,
        alignItems:"center"
    },

    buttonText: {
        color: "#FFF",
        fontSize: 17,
        textAlign: "center",
        textAlignVertical: "center",
        lineHeight: 50,
        elevation: 10,
        shadowColor: "#000",
    },

    signOutButton: {
        backgroundColor: '#4285F4',
        paddingVertical: 4,
        paddingHorizontal: 15,
        borderRadius: 8,
    },

})