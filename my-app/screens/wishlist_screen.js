import React, { Component } from 'react';
import {
  Text, View,
} from 'react-native';
import styles from '../style';

/**
 * The search screen
 * TO DO
 */

export default class WishlistScreen extends Component {
  static navigationOptions = {
    title: 'Wishlist',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Wish List Screen!!!
          {'\n'}
          -------TO DO-------
        </Text>
      </View>
    );
  }
}
