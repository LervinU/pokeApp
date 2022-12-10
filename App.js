import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import { useState } from 'react';
import AppContext from "./components/AppContext";
import TeamCreationScreen from './screens/TeamCreationScreen';
import PokemonSelectionScreen from './screens/PokemonSelectionScreen';
import TeamDetailsScreen from './screens/TeamDetailsScreen';


const Stack = createNativeStackNavigator();


export default function App() {
  const [user, setUser] = useState(null);
  const userSettings = {
    userSession: user,
    setUser
  }

  return (
    <AppContext.Provider value={userSettings}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={barStyle}/>
          <Stack.Screen name="Home" component={HomeScreen} options={homeOptions}/>
          <Stack.Screen name="TeamCreation" component={TeamCreationScreen} options={barStyle}/>
          <Stack.Screen name="Pokemon Selection" component={PokemonSelectionScreen} options={barStyle}/>
          <Stack.Screen name="Team Details" component={TeamDetailsScreen} options={barStyle}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

const barStyle = {
  headerStyle: {
    backgroundColor: '#096db2',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitleAlign:'center'
}

const homeOptions = {
  ...barStyle,
  headerBackVisible: false
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
