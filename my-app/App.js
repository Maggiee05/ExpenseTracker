import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-native-paper';
import LoginScreen from './frontend/screens/login_screen';
import RegisterScreen from './frontend/screens/register_screen';
import HomeScreen from './frontend/screens/home_screen';
import { ThemeContext } from './frontend/navigator/context';
import { MyLightTheme } from './themes';

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: MyLightTheme, // default is light theme
    };
  }

  changeTheme = (theme) => {
    this.setState({ theme });
  }

  render() {
    const { theme } = this.state;
    return (
      <ThemeContext.Provider value={{ theme, changeTheme: this.changeTheme }}>
        <Provider theme={theme}>
          <NavigationContainer theme={theme}>
            <Stack.Navigator>
              <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </ThemeContext.Provider>
    );
  }
}
