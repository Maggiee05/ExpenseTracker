import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrackerScreen from '../screens/tracker_screen';
import WishlistScreen from '../screens/wishlist_screen';
import SearchScreen from '../screens/search_screen';
import ReportScreen from '../screens/report_screen';

const MainTab = createBottomTabNavigator();

export default function MainStackNavigator() {
  return (
    <MainTab.Navigator tabBarOptions={{
      labelStyle: { fontSize: 12, marginBottom:'2%' },
    }}
    >
      <MainTab.Screen name="Tracker" component={TrackerScreen} />
      <MainTab.Screen name="Wishlist" component={WishlistScreen} />
      <MainTab.Screen name="Search" component={SearchScreen} />
      <MainTab.Screen name="Report" component={ReportScreen} />
    </MainTab.Navigator>
  );
}
