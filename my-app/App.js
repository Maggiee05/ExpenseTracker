import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import styles from './style';
import LoginScreen from './screens/login_screen';
import RegisterScreen from './screens/register_screen';
// import MainStackNavigator from './MainNavigator';
import HomeScreen from './screens/home_screen';
// import TrackerScreen from './tracker_screen';
// import WishlistScreen from './wishlist_screen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Login" > */}
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
