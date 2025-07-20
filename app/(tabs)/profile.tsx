import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function Profile() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

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

            router.navigate('/');
        } catch (error) {
            console.error('Sign out error', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileCard}>
                <Image
                    source={{ uri: user?.photoURL || 'https://via.placeholder.com/100' }}
                    style={styles.avatar}
                />
                <Text style={styles.displayName}>{user?.displayName || 'User'}</Text>
                <Text style={styles.email}>{user?.email}</Text>
                <TouchableOpacity onPress={signOut} style={styles.signOutButton} activeOpacity={0.8}>
                    <Text style={styles.signOutText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f4f8',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    profileCard: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 20,
        paddingVertical: 40,
        paddingHorizontal: 30,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 15,
        elevation: 10,
    },

    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#4285F4',
    },

    displayName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginBottom: 6,
    },

    email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },

    signOutButton: {
        backgroundColor: '#4285F4',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 30,
        shadowColor: "#4285F4",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },

    signOutText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
});
