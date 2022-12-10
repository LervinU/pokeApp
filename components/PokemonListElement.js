import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const PokemonListElement = (props) => {
    return (
        <View style={styles.rowContainer}>
            <Image
                source={{
                    uri: props.url
                }}
                style={styles.imageStyle}
            />
            <Text style={styles.textName}></Text>
        </View>
    )
}

export default PokemonListElement

const styles = StyleSheet.create({
    imageStyle: {
        width: 100,
        height: 100
    },

    textName: {
        fontSize: 18,
        fontWeight: "bold"
    },

    rowContainer: {
        flexDirection: 'row'
      }

})
