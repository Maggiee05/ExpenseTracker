import React from 'react';
import renderer from 'react-test-renderer';

import LoginScreen from '../screens/login_screen';
import RegisterScreen from '../screens/register_screen';
// import TrackerScreen from '../screens/tracker_screen';
// import WishlistScreen from '../screens/wishlist_screen';
import SearchScreen from '../screens/search_screen';
import ReportScreen from '../screens/report_screen';

describe('App', () => {
  it('renders login screen', async () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders register screen', async () => {
    const tree = renderer.create(<RegisterScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('renders tracker screen', async () => {
  //   const tree = renderer.create(<TrackerScreen />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders wishlist screen', async () => {
  //   const tree = renderer.create(<WishlistScreen />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  it('renders search screen', async () => {
    const tree = renderer.create(<SearchScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders report screen', async () => {
    const tree = renderer.create(<ReportScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
