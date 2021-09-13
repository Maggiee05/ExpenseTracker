import React, { Component } from 'react';
import {
  TouchableOpacity, View, Button, Alert, ActivityIndicator, TextInput,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Text, Switch } from 'react-native-paper';
import styles from '../../style';
import { UserContext, ThemeContext } from '../navigator/context';
import {
  getGoalStatus, setStatus, deleteAccount, changeCurrency, checkEndofMonth,
} from '../../backend/database/profile_db';
import { getInfo } from '../../backend/database/wishlist_db';
import { MyLightTheme, MyDarkTheme } from '../../themes';

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
      isEnabled1: false, // The currency switch toggle, true for '¥', false(default) for '$'
      isEnabled2: false, // The theme switch toggle, true for dark, false(default) for light
      currency: '',
      showWeb: false,
      url: '',
    };
  }

  componentDidMount = async () => {
    const currUser = this.context;
    const result = await getGoalStatus(currUser.user);
    const currency = await changeCurrency(currUser.user, 0);
    const urlResult = await getInfo(currUser.user);
    if (currency === '¥') {
      this.setState({ isEnabled1: true });
    }
    this.setState({
      currUser: currUser.user, status: result[0], goal: result[1], currency, url: urlResult.url,
    });
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const end = checkEndofMonth(date, month);
    // if it's the end of the month, and user does not reach the goal
    if (end && result[0].includes('remain')) { // change 'end' to current date for demo
      Alert.alert('You are so close to the goal this month.', 'Do you want to change the goal amount?',
        [{ text: 'No', onPress: this.setState({ changed: true }) },
          { text: 'Yes', onPress: this.setState({ goal: 0, changed: false }) }]);
      this.setState({ goal: 0 });
      // if it's the end of the month, and user reach the goal
    } else if (end && result[0].includes('reach')) { // change 'end' to current date for demo
      Alert.alert('Great job for this month!', 'Are you still interested in your wishlist?',
        [{ text: 'Cancel', onPress: this.setState({ goal: '', status: '' }) },
          { text: 'Yes', onPress: () => this.reachGoalHandler() }]);
    }
  }

  goalInputHandler = (text) => {
    this.setState({ goalInput: parseFloat(text) });
  }

  submitHandler = async (user, flag) => {
    // flag 0 for user-input number, 1 for random number ranging from 1000 to 6000
    const { changed, goalInput, currency } = this.state;
    if (changed) {
      Alert.alert("You've changed the goal once.", 'Keep going to reach your goal ^^');
    } else {
      let num = 0;
      if (flag === 1) {
        num = Math.round(Math.random() * 100) * 50 + 1000;
      } else {
        num = goalInput;
      }
      const result = await setStatus(user, num, currency);
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

  toggleSwitch = async (flag) => {
    const {
      isEnabled1, isEnabled2, currUser, status,
    } = this.state;
    if (flag === 1) {
      const result = await changeCurrency(currUser, 1);
      let newStatus = '';
      if (isEnabled1) {
        newStatus = status.replace('¥', '$');
      } else {
        newStatus = status.replace('$', '¥');
      }
      this.setState({ isEnabled1: !isEnabled1, currency: result, status: newStatus });
    } else {
      this.setState({ isEnabled2: !isEnabled2 });
    }
  }

  // prompting alert for user to confirm the selection
  deleteAlert = (currUser) => {
    Alert.alert('Are you sure you want to delete the account?', '',
      [{ text: 'Cancel', onPress: () => console.log('Delete Account Canceled') },
        { text: 'Yes', onPress: () => this.deleteHandler(currUser) }]);
  }

  deleteHandler = (currUser) => {
    deleteAccount(currUser);
    const { navigation } = this.props;
    navigation.navigate('Login');
  }

  // guides user to the webpage if selected
  reachGoalHandler = () => {
    this.setState({ showWeb: true });
  }

  // ----- the web view handlers ------- below
  backHandler = () => {
    this.setState({ showWeb: false });
    const { navigation } = this.props;
    navigation.navigate('Me');
  }

  webLoading = () => (
    <ActivityIndicator
      size="large"
      style={styles.webLoading}
    />
  )
  // ----- the web view handlers ------- above

  render() {
    const {
      currUser, goal, status, isEnabled1, isEnabled2, currency, showWeb, url,
    } = this.state;
    if (showWeb) {
      return (
        <View style={{ flex: 1 }}>
          <WebView
            source={{ uri: url }}
            startInLoadingState
            renderLoading={() => this.webLoading()}
          />

          <View style={styles.webViewBackPosition}>
            <TouchableOpacity onPress={() => this.backHandler()} style={styles.backButton}>
              <Text style={styles.webViewBackTxt}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={[styles.textAttr, { marginTop: '23%' }]}>
          YOUR GOAL IS:
          {' '}
          {currency}
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
            <Text style={styles.changeBtn1}> Change Categories </Text>
            <Text style={styles.changeBtn2}>
              {'>'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.pwdHandler()} style={styles.profileTab}>
            <Text style={styles.changeBtn1}> Change Password </Text>
            <Text style={styles.changeBtn2}>
              {'>'}
            </Text>
          </TouchableOpacity>

          <View style={styles.profileTab}>
            <Text style={styles.profileTabText}>
              Change Currency USD to CNY
            </Text>
            <Switch
              trackColor={{ false: '#81b0ff', true: '#767577' }}
              onValueChange={() => this.toggleSwitch(1)}
              value={isEnabled1}
              style={{ flex: 1.4 }}
            />
          </View>

          <ThemeContext.Consumer>
            {({ changeTheme }) => (
              <View style={styles.profileTab}>
                <Text style={styles.profileTabText}>
                  Dark Theme
                </Text>
                <Switch
                  trackColor={{ false: '#81b0ff', true: '#767577' }}
                  onValueChange={() => {
                    this.toggleSwitch(2);
                    changeTheme(isEnabled2 ? MyLightTheme : MyDarkTheme);
                  }}
                  value={isEnabled2}
                  style={{ flex: 1.4 }}
                />
              </View>
            )}
          </ThemeContext.Consumer>

          <View style={{ marginTop: '10%' }}>
            <Button title="Delete Account" color="red" onPress={() => this.deleteAlert(currUser)} />
          </View>

        </View>
      </View>
    );
  }
}

ProfileScreen.contextType = UserContext;
