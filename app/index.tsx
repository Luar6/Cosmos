import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from "react-native";
import { GoogleSignin, isSuccessResponse, User } from "@react-native-google-signin/google-signin";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithCredential } from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: "773571645758-b3evl4bja756le6i8dov4ne641r28pjr.apps.googleusercontent.com"
});

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // Listen to Firebase auth state changes
  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
      if (user) router.replace('/(tabs)/home');
    });
    return subscriber;
  }, []);

  // Google Sign-In Handler
  async function handleGoogleSignIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        const googleCredential = GoogleAuthProvider.credential(response.data.idToken);
        await signInWithCredential(getAuth(), googleCredential);
      }
    } catch (error) {
      console.log("Sign-in error:", error);
    }
  }

  if (initializing) return null;

  return (
    <LinearGradient
      colors={['#BA43CE', '#6900FD']}
      style={styles.container}>

      <View style={styles.content}>
        <Image
          style={{width: 100, height:100}}
          source={require('@/assets/images/icon.png')}
        />
        <Text style={styles.text}>Cosmos</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleGoogleSignIn}>
        <Image source={require('@/assets/images/logo-google.png')} style={{width: 20, height: 20}}/>
        <Text style={styles.textBtn}>Continuar com o Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.darkBtn} onPress={handleGoogleSignIn}>
        <Ionicons name="person-outline" size={20} color="white" />
        <Text style={styles.darkTextBtn}>Continuar como Visitante</Text>
      </TouchableOpacity>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  btn:{
    flexDirection:"row",
    gap: 5,
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 8,
    marginBlock: 10
  },
  darkBtn:{
    flexDirection:"row",
    gap: 5,
    alignItems: "center",
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 8,
    marginBlock: 10
  },
  textBtn:{
    fontWeight: "500",
    fontSize: 16
  },
  darkTextBtn:{
    fontWeight: "500",
    fontSize: 16,
    color: "white"
  },
  content:{
    flexDirection:"row",
    gap: 8,
    alignItems: "center",
    marginBottom: "20%",
  },
  text:{
    color:"#FFF",
    fontWeight:"500",
    fontSize: 50
  }
});
