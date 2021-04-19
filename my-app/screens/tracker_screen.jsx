/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
  Text, TextInput, View, TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Picker from '@gregfrench/react-native-wheel-picker';
import styles from '../style';
import { UserContext } from '../navigator/context';
import {
  setBalance, resetTracker, setMonthlyBalance, getBalance,
} from '../database/tracker_db';

/**
 * The expense tracker screen
 * Shows the current balance for the user
 * Features: select category, input expense/income amount, logout, reset
 */

const PickerItem = Picker.Item;

export default class TrackerScreen extends Component {
  static navigationOptions = {
    title: 'Tracker',
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      currUser: '',
      balance: '******',
      addAmount: 0.0,
      hideText: 'Show',
      selectedItem: 3,
      category: '',
      itemList: ['Housing', 'Eating', 'Education', 'Investment', 'Salary', 'Entertaining', 'Medical', 'Transportation'],
    };
  }

  componentDidMount() {
    const currUser = this.context;
    this.setState({ currUser: currUser.user });
  }

  logoutHandler = () => {
    const { navigation } = this.props;
    navigation.navigate('Login');
  }

  amountHandler = (text) => {
    this.setState({ addAmount: parseFloat(text) });
  }

  showHandler = async () => {
    const { currUser, hideText } = this.state;
    const result = await getBalance(currUser);
    if (hideText === 'Hide') {
      this.setState({ hideText: 'Show', balance: '******' });
    } else {
      this.setState({ hideText: 'Hide', balance: `$${result}` });
    }
  }

  // If 'Add' is clicked, category and amount will be updated/insert to the database
  addHandler = async () => {
    const { selectedItem, itemList } = this.state;
    const idx = selectedItem;
    const item = itemList[idx];
    await this.setState({ category: item });

    const { currUser, addAmount, category } = this.state;

    const currMonth = new Date().getMonth();
    setMonthlyBalance(currUser, parseFloat(addAmount), currMonth);

    const result = await setBalance(currUser, parseFloat(addAmount), category.toLowerCase());
    this.setState({ balance: `$${result}` });
  }

  onPickerSelect = (index) => {
    this.setState({
      selectedItem: index,
    });
  }

  resetHandler = (user) => {
    resetTracker(user);
    this.setState({ balance: '$0', category: '' });
  }

  render() {
    const {
      balance, currUser, hideText, itemList, selectedItem,
    } = this.state;
    return (
      <View>
        <Text style={styles.currentUser}>
          Welcome,
          {currUser}
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
                onPress={() => { this.showHandler(currUser); }}
              >
                <Text style={styles.showText}>{hideText}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>

            <Text style={styles.textAttr}>Category: </Text>

            <Picker
              style={{
                width: 170, height: 50, marginBottom: '40%', alignSelf: 'center',
              }}
              selectedValue={selectedItem}
              itemStyle={{ fontSize: 18, fontWeight: '500' }}
              onValueChange={(index) => this.onPickerSelect(index)}
            >

              {itemList.map((value, i) => (
                <PickerItem label={value} value={i} key={i} />
              ))}

            </Picker>

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
              this.addHandler(currUser);
            }}
          >
            <Text style={styles.loginButtonText}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.logoutHandler}
            style={{ marginTop: '8%' }}
          >
            <Icon reverse name="logout" color="#708090" size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.resetHandler(currUser)}
            style={styles.reset}
          >
            <Text style={{ fontWeight: '600', color: '#808080' }}> RESET</Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}

TrackerScreen.contextType = UserContext;
