/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
  TextInput, View, TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Text } from 'react-native-paper';
import Picker from '@gregfrench/react-native-wheel-picker';
import styles from '../../style';
import { UserContext } from '../navigator/context';
import {
  setBalance, resetTracker, setMonthlyBalance, getBalance,
} from '../../backend/database/tracker_db';
import { changeCurrency, setStatus } from '../../backend/database/profile_db';
import { getCategory } from '../../backend/global';

/**
 * The expense tracker screen
 * Shows the current balance for the user
 * Features: select category, input expense/income amount, logout, reset
 */

const PickerItem = Picker.Item; // The wheel picker

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
      itemList: [],
      currency: '',
    };
  }

  componentDidMount = async () => {
    const currUser = this.context;
    const currency = await changeCurrency(currUser.user, 0);
    const CategoryRes = getCategory();
    this.setState({ currUser: currUser.user, currency, itemList: CategoryRes });
  }

  logoutHandler = () => {
    const { navigation } = this.props;
    navigation.navigate('Login');
  }

  amountHandler = (text) => {
    this.setState({ addAmount: parseFloat(text) });
  }

  showHandler = async () => {
    // click to show/hide the balance amount, default is hided
    await this.componentDidMount();
    const { currUser, hideText, currency } = this.state;
    const result = await getBalance(currUser);
    if (hideText === 'Hide') {
      this.setState({ hideText: 'Show', balance: '******' });
    } else {
      this.setState({ hideText: 'Hide', balance: currency + result });
    }
  }

  // If 'Add' is clicked, category and amount will be updated/insert to the database
  addHandler = async () => {
    const { selectedItem, itemList, currency } = this.state;
    const idx = selectedItem;
    const item = itemList[idx];
    await this.setState({ category: item });

    const { currUser, addAmount, category } = this.state;

    const currMonth = new Date().getMonth();
    setMonthlyBalance(currUser, parseFloat(addAmount), currMonth);

    const result = await setBalance(currUser, parseFloat(addAmount), category.toLowerCase());
    this.setState({ balance: currency + result });
    setStatus(currUser, 0, '$');
  }

  onPickerSelect = (index) => {
    this.setState({
      selectedItem: index,
    });
  }

  resetHandler = (user) => {
    const { currency } = this.state;
    resetTracker(user);
    this.setState({ balance: `${currency}0`, category: '' });
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
              style={styles.picker}
              lineColor="#787878"
              selectedValue={selectedItem}
              itemStyle={{ fontSize: 18, fontWeight: '500', color: '#aaaaaa' }}
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
