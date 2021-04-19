import React, { Component } from 'react';
import {
  Text, TouchableOpacity, View, TextInput, Alert,
} from 'react-native';
import styles from '../style';

/**
 * The Change Password screen
 * TO DO
 */

export default class PasswordScreen extends Component {
  static navigationOptions = {
    title: 'Change Password',
  };

  constructor(props) {
    super(props);
    this.state = {
      // oldPassword: '',
      // newPassword: '',
      // confirmPassword: '',
    };
  }

  oldPasswordHandler = () => {
    // TO DO
  }

  newPasswordHandler = () => {
    // TO DO
  }

  confirmHandler = () => {
    // TO DO
  }

  registerHandler = (oldPassword, newPassword, confirmPassword) => {
    try {
      if (oldPassword === newPassword) {
        Alert.alert('New Password should not be the same as before');
      } else if (newPassword.length < 6) {
        Alert.alert('The password should have at least 6 characters.');
      } else if (newPassword !== confirmPassword) {
        Alert.alert('The confirmed password is not the same as password. Please re-enter.');
      } else {
        // TO DO
      }
    } catch (error) {
      // console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputbox}>
          <TextInput
            style={styles.textinput}
            placeholder="Enter your old Password"
            autoCapitalize="none"
            // onChangeText={() => this.oldPasswordHandler()}
          />
        </View>

        <View style={styles.inputbox}>
          <TextInput
            style={styles.textinput}
            placeholder="Enter new Password"
            secureTextEntry
            autoCapitalize="none"
            // TO DO
            // onChangeText={() => this.newPasswordHandler()}
          />
        </View>

        <View style={styles.inputbox}>
          <TextInput
            style={styles.textinput}
            placeholder="Confirm new Password"
            secureTextEntry
            autoCapitalize="none"
            // TO DO
            // onChangeText={() => this.confirmHandler()}
          />
        </View>

        <TouchableOpacity
          style={styles.registerButton2}
          // TO DO
          // onPress={() => {}}
        >
          <Text style={styles.loginButtonText}>Submit</Text>
        </TouchableOpacity>

      </View>
    );
  }
}
