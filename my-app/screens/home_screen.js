import React, { Component } from 'react';
import MainStackNavigator from '../navigator/MainNavigator';
import {UserContext} from '../navigator/context';

/**
 * The home screen class use to transmit the login/register screen to the main App screens
 * Receive the current user from login/register and pass to the main navigator
 */

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    headerShown: false,
  };

  constructor(props) {
    super(props);
    const { route } = this.props;
    const currUser = route.params.username;
    this.state = { user: currUser };

  }

  render() {
    const { user } = this.state;
    return (
      <UserContext.Provider value={{user}}>
          <MainStackNavigator />
      </UserContext.Provider>

    );
  }
}
