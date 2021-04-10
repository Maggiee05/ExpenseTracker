import React, { Component } from 'react';
import {
  Text, View,
} from 'react-native';
import styles from '../style';

/**
 * The search screen
 * TO DO
 */

export default class SearchScreen extends Component {
  static navigationOptions = {
    title: 'Search',
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Search Screen!!!
          {'\n'}
          -------TO DO-------
        </Text>
      </View>
    );
  }
}
