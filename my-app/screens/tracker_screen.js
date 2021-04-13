import React, { Component } from 'react';
import {
  Text, TextInput, View, TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import styles from '../style';
import { UserContext } from '../navigator/context';
import loginDb from '../database/login_db';

/**
 * The expense tracker screen
 * Shows the current balance for the user, user can input expense/income of the day
 * User can also logout by clicking the logout button
 */

export default class TrackerScreen extends Component {
  static navigationOptions = {
    title: 'Tracker',
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      balance: '******',
      addAmount: 0.0,
    };
  }

  logoutHandler = () => {
    const { navigation } = this.props;
    navigation.navigate('Login');
  }

  amountHandler = (text) => {
    this.setState({ addAmount: parseFloat(text) });
  }

  addHandler = async (user) => {
    const { addAmount } = this.state;
    const refStr = `users/${user}`;
    const snapshot = await loginDb.ref(refStr).once('value');
    const amount = parseFloat(snapshot.toJSON().balance);
    loginDb.ref(refStr).update({
      balance: amount + addAmount,
    });
    const result = parseFloat(snapshot.toJSON().balance) + addAmount;
    this.setState({ balance: `$${result}` });
  }

  render() {
    const { balance } = this.state;
    return (
      <UserContext.Consumer>
        { ({ user }) => (
          <View>
            <Text style={styles.currentUser}>
              Welcome,
              {user}
            </Text>
            <Text style={styles.date}>
              {'\n'}
              {`${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`}
            </Text>
            <View style={{ alignItems: 'center', marginTop: '32%' }}>
              <View>
                <Text style={styles.textAttr}>
                  YOUR BALANCE:
                </Text>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.balanceText}>
                    {balance}
                  </Text>
                  <TouchableOpacity
                    style={styles.showButton}
                    onPress={() => { this.addHandler(user); }}
                  >
                    <Text style={styles.showText}>Show</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ marginBottom: '8%', marginTop: '5%' }}>
                <Text style={styles.textAttr}>Memo: </Text>
                <View style={styles.inputbox}>
                  <TextInput
                    placeholder="Category"
                    style={styles.textinput}
                  />
                </View>
              </View>

              <View>
                <Text style={styles.textAttr}>Amount: </Text>
                <View style={styles.inputbox}>
                  <TextInput
                    placeholder="Negative for expense amount"
                    style={styles.textinput}
                    onChangeText={this.amountHandler}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  this.addHandler(user);
                }}
              >
                <Text style={styles.loginButtonText}>Add</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={this.logoutHandler}
                style={{ marginTop: '10%' }}
              >
                <Icon reverse name="logout" color="#708090" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </UserContext.Consumer>

    );
  }
}
