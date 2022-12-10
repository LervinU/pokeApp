import React from 'react'
import { View, Text } from 'react-native'

const DefaultAppText = (props) => {
    return (
            <Text style={{fontFamily:'Gill Sans'}}>{props.text}</Text>
    )
}

export default DefaultAppText
