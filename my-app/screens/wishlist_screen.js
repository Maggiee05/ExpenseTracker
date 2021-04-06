import React, { Component } from 'react';
import {
    Text, View, Image, TouchableOpacity,
  } from 'react-native';
import styles from '../style';

export default class WishlistScreen extends Component {
  static navigationOptions = {
    title: 'Wishlist',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
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