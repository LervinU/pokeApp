import React, { useCallback, useContext, useEffect } from 'react'
import {StyleSheet, View, Button, Text, Image } from 'react-native'
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import AppContext from "../components/AppContext";

  
const LoginScreen = () => {
    const navigation = useNavigation();
    const myContext = useContext(AppContext);

    useFocusEffect(
        useCallback(() => {
            GoogleSignin.configure({
                webClientId: '533006448193-j1ragr5q0m3jqehhr4hrh2i0iqtkksvv.apps.googleusercontent.com'
            });
    
            const unsubscribe = auth().onAuthStateChanged(user => {
                console.log(user);
                if(user) {
                    myContext.setUser(user);
                    navigation.navigate("Home");
                }
            });
            return unsubscribe;
        }, [])
    )

    const onGoogleButtonPress = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            const session =  auth().signInWithCredential(googleCredential);
            return session;
    } catch(e) {
        throw e;
    }
}

    const handleSignUp = () => { 
        onGoogleButtonPress().then(()=> {
            console.log('Signed in with Google!');
            navigation.navigate("Home");
        }).catch((e) => {
            console.log(e);
        })
    }

    return (
        <View style={styles.container}>

            <Image
                style={styles.logo}
                source={require("../assets/pokelogo.png")}
            />
            
            <GoogleSigninButton
                style={{ width: 192, height: 50 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={handleSignUp}
                
            />
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#efeee1',
      height: '100%'
    },
    logo: {
      width: 300,
      height: 100,
    },

    loginButton: {
        backgroundColor: '#4285F4',
        marginTop: 20
    }
  });