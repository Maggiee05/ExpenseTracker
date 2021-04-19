import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import TrackerScreen from '../screens/tracker_screen';
import WishlistScreen from '../screens/wishlist_screen';
import ProfileScreen from '../screens/profile_screen';
import ReportScreen from '../screens/report_screen';
import CategoryScreen from '../screens/category_screen';
import PasswordScreen from '../screens/password_screen';

const MainTab = createBottomTabNavigator();
const StackNav = createStackNavigator();

/**
 * The Profile 'Me' Screen, can navigate to 'Change Category' and 'Change Password' screens
 * Used Stack Navigator
 */
function Profile() {
  return (
    <StackNav.Navigator>
      <StackNav.Screen options={{ headerShown: false }} name="Profile" component={ProfileScreen} />
      <StackNav.Screen name="Categories" component={CategoryScreen} />
      <StackNav.Screen name="Change Password" component={PasswordScreen} />
    </StackNav.Navigator>
  );
}

/**
 * The Main Application Page, navigated from the Login/Register page
 * Used Bottom Yab Navigator
 */
export default function MainStackNavigator() {
  return (
    <MainTab.Navigator tabBarOptions={{
      labelStyle: { fontSize: 12, marginBottom: '2%' },
    }}
    >
      <MainTab.Screen name="Tracker" component={TrackerScreen} />
      <MainTab.Screen name="Wishlist" component={WishlistScreen} />
      <MainTab.Screen name="Report" component={ReportScreen} />
      <MainTab.Screen name="Me" component={Profile} />
    </MainTab.Navigator>
  );
}
