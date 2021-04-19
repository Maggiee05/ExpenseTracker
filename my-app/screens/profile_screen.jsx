import React, { Component } from 'react';
import {
  Text, TouchableOpacity, View, Button, TextInput, Alert, Switch,
} from 'react-native';
import styles from '../style';
import { UserContext } from '../navigator/context';
import { getGoalStatus, setStatus } from '../database/profile_db';

/**
 * The profile 'Me' screen
 * Features: Setting goal, changing categories, password, currency and theme
 */
export default class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Me',
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      currUser: '',
      goalInput: '',
      goal: '',
      status: '',
      changed: false,
      isEnabled1: false, // The currency switch button
      isEnabled2: false, // The Theme switch button
    };
  }

  componentDidMount = async () => {
    const currUser = this.context;
    const result = await getGoalStatus(currUser.user);
    this.setState({ currUser: currUser.user, status: result[0], goal: result[1] });
  }

  goalInputHandler = (text) => {
    this.setState({ goalInput: parseFloat(text) });
  }

  submitHandler = async (user, flag) => {
    // flag 0 for user-input number, 1 for random number ranging from 1000 to 6000
    const { changed, goalInput } = this.state;
    if (changed) {
      Alert.alert("You've changed the goal once. Keep going to reach your goal ^^");
    } else {
      let num = 0;
      if (flag === 1) {
        num = Math.round(Math.random() * 100) * 50 + 1000;
      } else {
        num = goalInput;
      }
      const result = await setStatus(user, num);
      this.setState({ changed: true, status: result, goal: num });
    }
  }

  catHandler = () => {
    const { navigation } = this.props;
    navigation.navigate('Categories');
  }

  pwdHandler = () => {
    const { navigation } = this.props;
    navigation.navigate('Change Password');
  }

  toggleSwitch = (flag) => {
    const { isEnabled1, isEnabled2 } = this.state;
    if (flag === 1) {
      this.setState({ isEnabled1: !isEnabled1 });
    } else {
      this.setState({ isEnabled2: !isEnabled2 });
    }
  }

  render() {
    const {
      currUser, goal, status, isEnabled1, isEnabled2,
    } = this.state;
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={[styles.textAttr, { marginTop: '23%' }]}>
          YOUR GOAL IS: $
          {goal}
        </Text>

        <View style={styles.goalInputBox}>
          <TextInput
            style={styles.urlInputText}
            placeholder="Enter a goal amount"
            autoCapitalize="none"
            onChangeText={(text) => this.goalInputHandler(text)}
          />
        </View>

        <View style={{ flexDirection: 'row', marginBottom: '8%', marginLeft: '6%' }}>
          <TouchableOpacity
            style={styles.goalButton}
            onPress={() => { this.submitHandler(currUser, 0); }}
          >
            <Text style={styles.loginButtonText}>OK</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.goalButton}
            onPress={() => { this.submitHandler(currUser, 1); }}
          >
            <Text style={styles.loginButtonText}>Go Random</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.statusText}>{status}</Text>

        <View style={{ width: 350, marginTop: '15%' }}>
          <TouchableOpacity onPress={() => this.catHandler()} style={styles.profileTab}>
            <Text style={{ flex: 8, fontWeight: 'bold', fontSize: 18 }}> Change Categories </Text>
            <Text style={{ flex: 0.6, fontSize: 16 }}>
              {'>'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.pwdHandler()} style={styles.profileTab}>
            <Text style={{ flex: 8, fontWeight: 'bold', fontSize: 18 }}> Change Password </Text>
            <Text style={{ flex: 0.6, fontSize: 16 }}>
              {'>'}
            </Text>
          </TouchableOpacity>

          <View style={styles.profileTab}>
            <Text style={{
              flex: 8, fontWeight: 'bold', fontSize: 18, marginTop: '1%',
            }}
            >
              Change Currency USD to CNY
            </Text>
            <Switch
              trackColor={{ false: '#81b0ff', true: '#767577' }}
              onValueChange={() => this.toggleSwitch(1)}
              value={isEnabled1}
              style={{ flex: 1.4 }}
            />
          </View>

          <View style={styles.profileTab}>
            <Text style={{
              flex: 8, fontWeight: 'bold', fontSize: 18, marginTop: '1%',
            }}
            >
              Dark Theme
            </Text>
            <Switch
              trackColor={{ false: '#81b0ff', true: '#767577' }}
              onValueChange={() => this.toggleSwitch(2)}
              value={isEnabled2}
              style={{ flex: 1.4 }}
            />
          </View>

          <View style={{ marginTop: '10%' }}>
            <Button title="Delete Account" color="red" />
          </View>

        </View>
      </View>
    );
  }
}

ProfileScreen.contextType = UserContext;
