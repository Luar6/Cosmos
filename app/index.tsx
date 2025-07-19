import React, { useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const AuthScreen = () => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);

  // ✅ Configure Google Sign-In once
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '773571645758-b3evl4bja756le6i8dov4ne641r28pjr.apps.googleusercontent.com',
    });
  }, []);

  // ✅ Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(currentUser => {
      setUser(currentUser);
      if (initializing) setInitializing(false);
    });

    return unsubscribe; // cleanup listener
  }, [initializing]);

  // ✅ Sign in with Google
  const signInWithGoogle = useCallback(async () => {
    try {
      setLoading(true);

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.warn('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.warn('Sign in is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.warn('Play services not available or outdated');
      } else {
        console.error('Google Sign-In error:', error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Sign out
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (initializing) return null;

  return (
    <SafeAreaView style={styles.container}>
      {user ? (
        <View style={styles.center}>
          <Text style={styles.welcome}>Welcome, {user.email}</Text>
          <TouchableOpacity onPress={signOut} style={styles.button}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.center}>
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={signInWithGoogle}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default AuthScreen;

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#222',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
