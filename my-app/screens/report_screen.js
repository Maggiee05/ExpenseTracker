import React, { Component } from 'react';
import {
  Text, View,
} from 'react-native';
import styles from '../style';

export default class ReportScreen extends Component {
  static navigationOptions = {
    title: 'Report',
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
          Report Screen!!!
          {'\n'}
          -------TO DO-------
        </Text>
      </View>
    );
  }
}
