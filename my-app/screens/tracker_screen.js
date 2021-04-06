import React, { Component } from 'react';
import {
  Text, TextInput, View, TouchableOpacity,
} from 'react-native';
import styles from '../style';

export default class TrackerScreen extends Component {
  static navigationOptions = {
    title: 'Tracker',
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  logoutHandler = () => {
    console.log('Tracker logout!!!');
    const { navigation } = this.props;
    // const { navigate } = this.props.navigation;
    navigation.navigate('Login');
  }

  render() {
    return (
      // <View style={styles.container}>
      <View style={{ alignItems: 'center', marginTop: '20%' }}>
        <View>
          <Text style={styles.textAttr}>
            YOUR BALANCE:
          </Text>
          <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: '20%' }}> $1000.00</Text>
        </View>

        {/* <Text>Expense Tracker Screen!!!</Text> */}
        {/* <Text>Expense</Text>
        <Text>Saving</Text> */}
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
          />
        </View>

        <TouchableOpacity style={styles.loginButton}>
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
