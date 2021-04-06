import React, { Component } from 'react';
import MainStackNavigator from '../navigator/MainNavigator';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    headerShown: false,
  };

  // constructor(props) {
  //   super(props);
  //   const { route } = this.props;
  //   const currUser = route.params.username;
  //   this.state = { user: currUser };
  // }

  render() {
    return (
      // <MainStackNavigator screenProps={{ user: this.state.user }} />
      <MainStackNavigator />
    );
  }
}
