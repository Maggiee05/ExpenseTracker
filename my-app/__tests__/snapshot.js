import React from 'react';
import renderer from 'react-test-renderer';

import LoginScreen from '../screens/login_screen';
import RegisterScreen from '../screens/register_screen';

describe('App', () => {
  it('renders login screen', async () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders register screen', async () => {
    const tree = renderer.create(<RegisterScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
