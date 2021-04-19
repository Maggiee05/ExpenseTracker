import React, { Component } from 'react';
import {
  Text, TouchableOpacity, View, FlatList, TextInput,
} from 'react-native';
import { Icon } from 'react-native-elements';
import styles from '../style';

/**
 * The category screen, allow user to add/delete categories
 * TO DO
 */
export default class CatogoryScreen extends Component {
  static navigationOptions = {
    title: 'Categories',
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      // For week 3 demo
      data: [{ key: 'Housing' }, { key: 'Eating' }, { key: 'Entertaining' }, { key: 'Investment' }, { key: 'Education' }, { key: 'Medical' }],
    };
  }

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={(
            { item },
          ) => (
            <TouchableOpacity style={styles.categoryTab}>
              <Text style={styles.categoryText}>
                {' '}
                {item.key}
                {' '}
              </Text>
              <Text style={styles.addText}> Added </Text>
            </TouchableOpacity>
          )}
        />
        <View style={{ flexDirection: 'row', marginBottom: '5%' }}>
          <View style={styles.goalInputBox}>
            <TextInput
              style={styles.urlInputText}
              placeholder="Enter new category"
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity style={{ marginTop: '3%', marginLeft: '5%' }}>
            <Icon reverse name="add" size={20} color="#b0c4de" />
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}
