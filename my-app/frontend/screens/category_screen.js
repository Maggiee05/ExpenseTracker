import React, { Component } from 'react';
import {
  TouchableOpacity, View, FlatList, TextInput, Alert,
} from 'react-native';
import { Text } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import styles from '../../style';
import { UserContext } from '../navigator/context';
import { addCategory, deleteCategory, getCategory } from '../../backend/global';

/**
 * The category screen, allow user to add/delete categories
 * Enter in the input box to add, and click to delete
 * Also change the wheel picker in Tracker Screen
 */
export default class CatogoryScreen extends Component {
  static navigationOptions = {
    title: 'Categories',
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [], // storing the category list
      input: '', // handling the user input
    };
  }

  componentDidMount = () => {
    const CategoryRes = getCategory();
    this.setState({ data: CategoryRes });
  }

  inputHandler = (text) => {
    this.setState({ input: text });
  }

  // add a category to the list
  addHandler = () => {
    const { input } = this.state;
    const dataModified = addCategory(input);
    this.setState({ data: dataModified });
    this.componentDidMount();
  }

  // prompting alert for user to confirm selection
  deleteAlert = (item) => {
    Alert.alert('Do you want to delete this category?', '',
      [{ text: 'Cancel', onPress: () => console.log('Canceled') },
        { text: 'Yes', onPress: () => this.deleteHandler(item) }]);
  }

  // delete category from the list
  deleteHandler = (item) => {
    const dataModified = deleteCategory(item);
    this.setState({ data: dataModified });
  }

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={data.map((e) => ({ key: e }))}
          renderItem={(
            { item },
          ) => (
            <TouchableOpacity
              style={styles.categoryTab}
              onPress={() => this.deleteAlert(item.key)}
            >
              <Text style={styles.categoryText}>
                {item.key}
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
              onChangeText={this.inputHandler}
            />
          </View>
          <TouchableOpacity style={{ marginTop: '3%', marginLeft: '5%' }} onPress={() => this.addHandler()}>
            <Icon reverse name="add" size={20} color="#b0c4de" />
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}

CatogoryScreen.contextType = UserContext;
