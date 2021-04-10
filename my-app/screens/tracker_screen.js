import React, { Component } from 'react';
import {
  Text, TextInput, View, TouchableOpacity,
} from 'react-native';
import styles from '../style';

/**
 * The expense tracker screen
 * TO DO : Backend
 */
export default class TrackerScreen extends Component {
  static navigationOptions = {
    title: 'Tracker',
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      balance: 1000.00,
      addAmount: 0.0,
    };
  }

  logoutHandler = () => {
    console.log('Tracker logout!!!');
    const { navigation } = this.props;
    // const { navigate } = this.props.navigation;
    navigation.navigate('Login');
  }

  amountHandler = (text) => {
    this.setState({ addAmount: parseFloat(text) });
  }

  addHandler = () => {
    const { balance, addAmount } = this.state;
    this.setState({ balance: balance + addAmount });
  }

  render() {
    const { balance } = this.state;
    return (
      // <View style={styles.container}>
      <View style={{ alignItems: 'center', marginTop: '20%' }}>
        <View>
          <Text style={styles.textAttr}>
            YOUR BALANCE:
          </Text>
          <Text style={{
            fontSize: 25, fontWeight: 'bold', marginBottom: '20%', alignSelf: 'center',
          }}
          >
            $
            {balance}
          </Text>
        </View>

        <View style={{ marginBottom: '8%' }}>
          <Text style={styles.textAttr}>Memo: </Text>
          <TextInput
            placeholder="Category"
            style={styles.inputbox}
          />
        </View>

        <View>
          <Text style={styles.textAttr}>Amount: </Text>
          <TextInput
            placeholder="nagative for expense amount"
            style={styles.inputbox}
            onChangeText={this.amountHandler}
          />
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={this.addHandler}
        >
          <Text style={styles.loginButtonText}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: 70, height: 35, borderRadius: 8, backgroundColor: '#add8e6', marginTop: '10%',
          }}
          onPress={this.logoutHandler}
        >

          <Text style={{
            alignSelf: 'center',
            marginTop: '10%',
            fontSize: 15,
            fontWeight: 'bold',
          }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>

    );
  }
}
