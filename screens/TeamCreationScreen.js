import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const TeamCreationScreen = () => {

    const navigation = useNavigation();

    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegions] = useState({});

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/region/")
        .then((response) => response.json())
        .then(data => {
            setRegions(data.results);
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    const onClickRegion = (regionObj) => {

        navigation.navigate("Pokemon Selection", regionObj);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select a region</Text>
            {regions.map((e) => {
                return(
                    <Pressable
                        onPress={() => onClickRegion(e)}
                        style={styles.regionBtn}
                        key={e.name}
                    >
                        <Text style={styles.btnText}>{e.name.charAt(0).toUpperCase() + e.name.slice(1)}</Text>
                    </Pressable>
                )
            })}
        </View>
    )
}

export default TeamCreationScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        backgroundColor: "#efeee1",
        height: '100%',
    
      },

    regionBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#096db2',
        marginTop: 15,
        marginLeft: 15, 
        marginRight: 15
        
    },

    btnText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    title: {
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: 18,
        paddingBottom: 10
    }
})
