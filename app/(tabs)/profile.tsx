import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { FAB, useTheme } from 'react-native-paper';

export default function Profile() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const { colors } = useTheme();

    useEffect(() => {
        const auth = getAuth(getApp());
        setUser(auth.currentUser);
    }, []);

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();

            const auth = getAuth(getApp());
            await auth.signOut();

            router.replace('/');
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
                <FAB
                    label="Sair"
                    onPress={signOut}
                    style={styles.signOutButton}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
        paddingVertical: 4,
        paddingHorizontal: 15,
        borderRadius: 8,
    },

})