import React, { useContext } from 'react'
import { View, Text, StyleSheet, Pressable, Image, FlatList, SafeAreaView } from 'react-native'
import database from '@react-native-firebase/database';
import AppContext from '../components/AppContext';
import { useNavigation } from '@react-navigation/core';

const TeamDetailsScreen = ({route}) => {

    const { teamId, pokeTeam } = route.params;
    const myContext = useContext(AppContext);
    const userId = myContext.userSession._user.uid;
    const navigation = useNavigation();

    const onDeleteTeam = () => {   
        database().ref(`/users/${userId}/${teamId}`).remove()
        .then(() => {
            console.log(`Team deleted`);
            navigation.navigate("Home");
        })
    };

    const onEditTeam = () => {
        navigation.navigate("Pokemon Selection", 
            {
                url: pokeTeam[0].region.url,
                name: pokeTeam[0].region.name,
                teamId: teamId,
                action: "edit"
            }
        )
    }

    const Item = ({ item, front_sprite, pokemonName, pokedex_num, type }) => (
        <View style={styles.pokemonDetailRow}>
          <Image style={styles.pokeImage} source={{uri: front_sprite}}/>
          <View style={styles.pokemonDataCol}>
            <Text style={styles.pokemonNameTxt}>{pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</Text>
            <Text>No. {pokedex_num}</Text>
            {type.map(type => (
                <Text>{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</Text>
            ))}
          </View>
        </View>
      );

    const renderItem = ({ item }) => (
        <Item 
        front_sprite={item.front_sprite}
        pokemonName={item.name}
        pokedex_num={item.pokedex_num}
        type={item.type}
        key={item.pokedex_num}
        />
      );

    return (
        <View style={styles.container}>
        <SafeAreaView >
            {/* {console.log(pokeTeam)} */}

            <FlatList
                data={pokeTeam}
                renderItem={renderItem}
                keyExtractor={item => item.pokedex_num}
            />
            <Pressable
                onPress={onDeleteTeam}
                style={styles.deleteTeamBtn}
            >
                <Text style={styles.deleteTeamBtnTxt}>Delete</Text>
            </Pressable>

            <Pressable
                
                onPress={onEditTeam}
                style={styles.editTeamBtn}
            >
                <Text style={styles.deleteTeamBtnTxt}>Edit</Text>
            </Pressable>
        </SafeAreaView>
        </View>
    )
}

export default TeamDetailsScreen

const styles = StyleSheet.create({
    container: {

        backgroundColor:'#efeee1',
        height:'100%'
    },
    deleteTeamBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        backgroundColor: '#8b0000',
        position: 'absolute',
        top: 550,
        right: 20
        
    },
    deleteTeamBtnTxt: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    pokeImage: {
        width: 100,
        height: 100
    },
    pokemonDetailRow: {
        display:'flex',
        flexDirection:'row',
        borderColor: "rgba(0,0,0,0.2)",
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 10,
        width:'90%',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: 20
    },
    pokemonNameTxt: {
        fontSize:20, 
        fontWeight: 'bold'
    },
    pokemonDataCol: {
        marginLeft: 10
    },
    editTeamBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 42,
        borderRadius: 4,
        backgroundColor: '#096db2',
        position: 'absolute',
        top:500,
        right: 20
    }
})