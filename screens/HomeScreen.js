import React, { useCallback, useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, Pressable, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import AppContext from '../components/AppContext';

const HomeScreen = () => {

    const navigation = useNavigation();
    const myContext = useContext(AppContext);
    const userId = myContext.userSession?._user.uid;

    const [teams, setTeams] = useState({});
    
    useFocusEffect(
        useCallback(() => {
            database()
            .ref(`/users/${userId}`)
            .once('value')
            .then(snapshot => {
                setTeams(snapshot.val())
            });
        },[])
    )

    const handleLogOut = () => {
        auth()
            .signOut()
            .then(() => {
                myContext.setUser(null);
                navigation.navigate("LoginScreen");
            });
    }

    const onClickCreateTeam = () => {
        navigation.navigate("TeamCreation");
    }
    return (
        <View style={{ backgroundColor: '#efeee1', height:'100%' }}>
        <SafeAreaView style={styles.container}>
            {/* <Button 
                style={ styles.loginButton }
                onPress={() => {console.log(myContext.userSession)}}
                title = "Log Out"
                mode="contained"
            >
            </Button> */}
            <ScrollView>
                <View style={styles.titleView}>
                <Text style={styles.screenTitle}>Your teams</Text>
                <Pressable
                    onPress={handleLogOut}
                >
                    <Text style={styles.logoutBtn}>Log Out</Text>
                </Pressable>
                </View>
                {teams && Object.entries(teams).map(([key, value]) => {
                    return value.map(pokemonTeam => {
                        return (
                            <TouchableOpacity 
                            style={styles.pokeTeamRow}
                            key={key}
                            onPress={() => { 
                                navigation.navigate("Team Details", {teamId: key, pokeTeam: pokemonTeam})
                             }}
                            >
                                    {pokemonTeam.map(pokeData => <Image key={pokeData.pokedex_num} style={styles.pokeImage} source={{uri: pokeData.front_sprite}} />)}
                            </TouchableOpacity>

                        )
                    })

                })}
            </ScrollView>
            <Pressable
                onPress={onClickCreateTeam}
                style={styles.createTeamBtn}
            >
                <Text style={styles.btnText}>Create</Text>
            </Pressable>
        </SafeAreaView>
        </View>
    )
}

export default HomeScreen


const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30,
      
    },
    logo: {
      width: 300,
      height: 100,
    },

    loginButton: {
        backgroundColor: '#4285F4',
        marginTop: 20
    },

    createTeamBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        backgroundColor: '#096db2',
        position: 'absolute',
        right: 20,
        top: 550

    },

    btnText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    pokeImage: {
        width: 60,
        height: 70,
        marginBottom: 10,
        marginTop: 10

    },
    pokeTeamRow: {
        display:'flex',
        flexDirection:'row',
        borderColor: "#096db2",
        borderRadius: 5,
        // borderWidth: 1,
        marginBottom: 20,
        width:'100%',
        backgroundColor:"rgba(9,109,178, .2)"
    },
    screenTitle: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
        textAlign: 'center',
        marginBottom: 20
    },

    titleView: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        left: 35
    },
    logoutBtn: {
        color: '#8b0000',
        left: '100%'
    }
  });
