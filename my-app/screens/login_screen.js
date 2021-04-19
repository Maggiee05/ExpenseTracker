import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, Alert, TextInput,
} from 'react-native';
import styles from '../style';
import loginDb from '../database/login_db';

/**
 * The login screen
 * Navigate to the home screen if correct username and password
 */

export default class LoginScreen extends Component {
    static navigationOptions = {
      title: 'Login',
      headerShown: false,
    };

    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
      };
    }

    usernameHandler = (text) => {
      this.setState({ username: text });
    }

    passwordHandler = (text) => {
      this.setState({ password: text });
    }

    registerHandler = () => {
      console.log('Register clicked!!!');
      const { navigation } = this.props;
      navigation.navigate('Register');
    };

    loginHandler = (username, password) => {
      // Integrating with Firebase to check whether the usename and password is correct
      console.log('Login clicked!!!');
      const refStr = `users/${username}`;
      console.log(refStr);
      loginDb.ref(refStr).once('value', (snapshot) => {
        if (!snapshot.exists()) {
          Alert.alert('Username not exists. Please sign up first.');
        } else if (snapshot.toJSON().password !== password) {
          Alert.alert('Incorrect password');
        } else {
          const { navigation } = this.props;
          navigation.navigate('Home', { username });
        }
      });
    }

    render() {
      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 60, fontWeight: '700', marginBottom: '10%' }}>Hello</Text>
          <View style={styles.inputbox}>
            <TextInput
              style={styles.textinput}
              placeholder="Username"
              autoCapitalize="none"
              onChangeText={this.usernameHandler}
            />
          </View>

          <View style={styles.inputbox}>
            <TextInput
              style={styles.textinput}
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={this.passwordHandler}
            />
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              const { username } = this.state;
              const { password } = this.state;
              this.loginHandler(username, password);
            }}
          >
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton1}
            onPress={this.registerHandler}
          >
            <Text style={styles.loginButtonText}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      );
    }
}
