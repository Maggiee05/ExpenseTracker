import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import styles from '../style';
import loginDb from '../login_db';

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
    // console.log(text);
    this.setState({ username: text });
  }

  passwordHandler = (text) => {
    // console.log(text);
    this.setState({ password: text });
  }

  confirmHandler = (text) => {
    this.setState({ confirmPassword: text });
  }

  registerHandler = (username, password, confirm) => {
    try {
      if (password !== confirm) {
        Alert.alert('The confirmed password is not the same as password. Please re-enter.');
        console.log('Not the same password');
      } else if (password.length < 6) {
        Alert.alert('The password should have at least 6 characters.');
        console.log('Passwords length not correct');
      } else {
        const refStr = `users/${username}`;
        loginDb.ref(refStr).set({
          name: username,
          password,
        }).then(() => {
          console.log('INSERTED');
        }).catch((error) => {
          console.log(error);
        });

        const { navigation } = this.props;
        navigation.navigate('Home');
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

        <View style={styles.inputbox}>
          <TextInput
            style={styles.textinput}
            placeholder="Confirm Password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={this.confirmHandler}
          />
        </View>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => {
            const { username } = this.state;
            const { password } = this.state;
            const { confirmPassword } = this.state;
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