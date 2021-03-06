import React, { Component } from 'react';
import {
  View, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { Text } from 'react-native-paper';
import { Base64 } from 'js-base64';
import styles from '../../style';
import loginDb from '../../backend/database/login_db';

/**
 * The register screen
 * Navigate to the home screen if valid username and password
 */

export default class RegisterScreen extends Component {
  static navigationOptions = {
    title: 'Register',
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
    };
  }

  usernameHandler = (text) => {
    this.setState({ username: text });
  }

  passwordHandler = (text) => {
    this.setState({ password: text });
  }

  confirmHandler = (text) => {
    this.setState({ confirmPassword: text });
  }

  registerHandler = (username, password, confirm) => {
    // Insert the username and password to Firebase if valid
    try {
      if (password !== confirm) {
        Alert.alert('The confirmed password is not the same as password. Please re-enter.');
      } else if (password.length < 6) {
        Alert.alert('The password should have at least 6 characters.');
      } else {
        // default attributes for a new user
        const refStr = `users/${username}`;
        loginDb.ref(refStr).set({
          name: username,
          password: Base64.encode(confirm),
          price: '',
          rate: '',
          balance: 0,
          monthlyBalance: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          imageUrl: 'http://pngimg.com/uploads/amazon/amazon_PNG21.png',
          url: 'https://www.amazon.com/ref=nav_logo',
          productName: '',
          stock: '',
          category: '',
          goal: 0,
          status: '',
          currency: '$',
        }).then(() => {
          console.log('New user&password inserted into database');
        }).catch((error) => {
          console.log(error);
        });

        const { navigation } = this.props;
        navigation.navigate('Home', { username });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputbox}>
          <TextInput
            style={styles.textinput}
            placeholder="Username"
            autoCapitalize="none"
            onChangeText={(text) => this.usernameHandler(text)}
          />
        </View>

        <View style={styles.inputbox}>
          <TextInput
            style={styles.textinput}
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(text) => this.passwordHandler(text)}
          />
        </View>

        <View style={styles.inputbox}>
          <TextInput
            style={styles.textinput}
            placeholder="Confirm Password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(text) => this.confirmHandler(text)}
          />
        </View>

        <TouchableOpacity
          style={styles.registerButton2}
          onPress={() => {
            const { username, password, confirmPassword } = this.state;
            this.registerHandler(username, password,
              confirmPassword);
          }}
        >
          <Text style={styles.loginButtonText}>SIGN UP</Text>
        </TouchableOpacity>

      </View>
    );
  }
}
