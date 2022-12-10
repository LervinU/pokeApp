import React, { useContext, useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import database from '@react-native-firebase/database';
import AppContext from '../components/AppContext';
import { useNavigation } from '@react-navigation/core';

const PokemonSelectionScreen = ({route}) => {
    const { name, url, teamId, action } = route.params;
    const myContext = useContext(AppContext);

    const navigation = useNavigation();

    const [regionPokedex, setRegionPokedex] = useState([]);
    const [pokemonTeam, setPokemonTeam] = useState([]);

    useEffect(() => {
        fetch(url) // 'https://pokeapi.co/api/v2/region/#'
        .then(response => response.json())
        .then(data => {
            if(data.pokedexes.length !== 0) {
                fetch(data.pokedexes[0].url) // 'https://pokeapi.co/api/v2/pokedex/#'
                .then(response => response.json())
                .then(pokedexData => {
                    setRegionPokedex(pokedexData.pokemon_entries);
                })
                .catch(error => {
                    console.log(error);
                })
            } else {throw "There is not pokedexes available for this region"}
        })
        .catch(error => {
            console.log(error);
        })
    },[]);

    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <Text style={[styles.title, textColor]}>{item.pokemon_species.name.charAt(0).toUpperCase() + item.pokemon_species.name.slice(1)}</Text>
      </TouchableOpacity>
    )
    const renderItem = ({ item }) => {
        const backgroundColor = pokemonTeam.includes(item.pokemon_species.name) ? "rgba(9,109,178, .9)" : "#FFFFF";
        const color = pokemonTeam.includes(item.pokemon_species.name) ? "white" : "black";
        return (
            <Item
                item={item}
                onPress={() => {
                    if(pokemonTeam.length <= 5) {
                        pokemonTeam.includes(item.pokemon_species.name) ? 
                        setPokemonTeam(pokemonTeam.filter(pokemonName => pokemonName !== item.pokemon_species.name )) :
                        setPokemonTeam([...pokemonTeam, item.pokemon_species.name])
                    } else if(pokemonTeam.length > 5 && pokemonTeam.includes(item.pokemon_species.name)){
                        return setPokemonTeam(pokemonTeam.filter(pokemonName => pokemonName !== item.pokemon_species.name ));
                    }else {
                        return getAlertMessage("Error", "Cannot have more than six pokemons in a team.")
                    }
                }}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            >
            </Item>
        )
    };


    const addTeamToDb = () => {
        if(pokemonTeam.length < 3){
            getAlertMessage("Can't create team", "You need a minimun of three Pokemon on you team.");
        } else {
            getPokemonInfo()
            .then(pokemon => {
                const userId = myContext.userSession._user.uid;

                const reference = action !== "edit" ? 
                database().ref(`/users/${userId}`).push() : 
                database().ref(`/users/${userId}/${teamId}`);

                reference.set({...[pokemon]})
                .then(() => {
                    console.log("Data Updated");
                    navigation.navigate("Home");
                })
                .catch(error => {
                    console.log(error);
                })
            })
        }
    }

    const getPokemonInfo = () => {
        const urls = pokemonTeam.map(pokemonName => `https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        return Promise.all(urls.map(url => 
            fetch(url)
            .then(response => response.json())
        ))
        .then(data => {
            return data.map(pokemonObj => {
                return {
                    name: pokemonObj.name,
                    front_sprite: pokemonObj.sprites.front_default,
                    pokedex_num: pokemonObj.id,
                    type: pokemonObj.types,
                    region: {name: name, url: url},
                    
                }
            })  
        })
        .catch(error => {
            console.log(error);
        })

    }
    const getAlertMessage = (title, message) =>
    Alert.alert(
      title,
      message,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
            data={regionPokedex}
            renderItem={renderItem}
            keyExtractor={(item) => item.pokemon_species.name}
            extraData={pokemonTeam}
            />
            <TouchableOpacity
                style={styles.addTeamBtn}
                onPress={(addTeamToDb)}
            >
                <Text style={styles.addTeamBtnTxt}>+</Text>
            </TouchableOpacity>
      </SafeAreaView>
    );
}

export default PokemonSelectionScreen

const styles = StyleSheet.create({
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        // borderColor: "rgba(0,0,0,0.2)",
        backgroundColor:'rgba(9,109,178, .9)',
        borderRadius: 5,
        // borderWidth: 1
      },
      title: {
        fontSize: 32,
      },
      container: {
       backgroundColor:"#efeee1",
       height:'100%'

      },
      addTeamBtnTxt: {
          fontSize: 30,
          color:"white"
      },
      addTeamBtn: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:70,
        position: 'absolute',                                          
        bottom: 50,                                                    
        right: 20,
        height:70,
        backgroundColor:'#096db2',
        borderRadius:100
      }
    
})
