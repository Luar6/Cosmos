import React, { useEffect } from 'react';
import { Text, Button, StyleSheet, View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { Asset } from 'expo-asset';
import { GoogleSignin, isSuccessResponse, isErrorWithCode, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import app from '../firebaseConfig';  // <-- import the initialized firebase app
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

const auth = getAuth(app); // <-- get auth instance with initialized app

const appIcon = Asset.fromModule(require('../assets/images/icon.png')).uri;

export default function SplashScreen() {
  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: "773571645758-b2sieoo74u60nnoemi18qjetefrffhl3.apps.googleusercontent.com",
      webClientId: "773571645758-b3evl4bja756le6i8dov4ne641r28pjr.apps.googleusercontent.com",
      profileImageSize: 150
    });
  });

  const handleGoogleSignIn = async() => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        const { idToken, user } = response.data;
        const { name, email, photo } = user;
      } else {
        console.log("Google Sign-in was cancelled")
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log("Google Sign-in is in progress")
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log("Play Services is not available")
            break
          default:
            console.log(error.code)
        }
    }
  };

  return (
    <LinearGradient
      colors={['#BA43CE', '#6900FD']}
      start={{ x: 0, y: 0.36 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.row}>
        <Image source={{ uri: appIcon }} style={{ width: 80, height: 80, marginRight: 10 }} />
        <Text style={styles.title}>Cosmos</Text>
      </View>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleGoogleSignIn}
      />;
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 60, color: 'white' },
})};
