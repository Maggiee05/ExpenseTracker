import React, { Component } from 'react';
import {
  TouchableOpacity, View, TextInput, Alert,
} from 'react-native';
import { Text } from 'react-native-paper';
import styles from '../../style';
import { UserContext } from '../navigator/context';
import { setPassword, getPassword } from '../../backend/database/profile_db';

/**
 * The Change Password screen
 */

export default class PasswordScreen extends Component {
  static navigationOptions = {
    title: 'Change Password',
  };

  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      originalPwd: '',
      currUser: '',
    };
  }

  componentDidMount = async () => {
    const currUser = this.context;
    const pwd = await getPassword(currUser.user);
    this.setState({ currUser: currUser.user, originalPwd: pwd });
  }

  oldPasswordHandler = (text) => {
    this.setState({ oldPassword: text });
  }

  newPasswordHandler = (text) => {
    this.setState({ newPassword: text });
  }

  confirmHandler = (text) => {
    this.setState({ confirmPassword: text });
  }

  OKHandler = () => {
    const { navigation } = this.props;
    navigation.navigate('Profile');
  }

  registerHandler = () => {
    const {
      oldPassword, newPassword, confirmPassword, originalPwd,
    } = this.state;
    try {
      if (oldPassword === newPassword) {
        Alert.alert('New Password should not be the same as before');
      } else if (newPassword.length < 6) {
        Alert.alert('The password should have at least 6 characters.');
      } else if (newPassword !== confirmPassword) {
        Alert.alert('The confirmed password does not match. Please re-enter.');
      } else if (oldPassword !== originalPwd) {
        Alert.alert('Incorrect old password');
      } else {
        const { currUser } = this.state;
        setPassword(currUser, confirmPassword);
        Alert.alert('Password successfully changed!', '', [{ text: 'OK', onPress: () => this.OKHandler() }]);
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
            placeholder="Enter your old Password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(text) => this.oldPasswordHandler(text)}
          />
        </View>

        <View style={styles.inputbox}>
          <TextInput
            style={styles.textinput}
            placeholder="Enter new Password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(text) => this.newPasswordHandler(text)}
          />
        </View>

        <View style={styles.inputbox}>
          <TextInput
            style={styles.textinput}
            placeholder="Confirm new Password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(text) => this.confirmHandler(text)}
          />
        </View>

        <TouchableOpacity
          style={styles.registerButton2}
          onPress={() => this.registerHandler()}
        >
          <Text style={styles.loginButtonText}>Submit</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

PasswordScreen.contextType = UserContext;
