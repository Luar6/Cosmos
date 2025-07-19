import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { GoogleSignin, isSuccessResponse, User } from "@react-native-google-signin/google-signin";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithCredential } from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';

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
    <View style={styles.container}>
      {!user ? (
        <Button title="Entrar com Google" onPress={handleGoogleSignIn} />
      ) : (
        <Text>Welcome {user.email}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
