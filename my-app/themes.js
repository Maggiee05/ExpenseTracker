import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { DarkTheme as DarkThemeElem, DefaultTheme as DefaultThemeElem } from 'react-native-paper';

/**
 * The Theme configurations
 */

export const MyLightTheme = {
  ...DefaultTheme,
  ...DefaultThemeElem,
  colors: {
    ...DefaultTheme.colors,
    ...DefaultThemeElem.colors,
    text: 'rgb(10, 10, 10)',
    border: 'rgb(199, 199, 204)',
    primary: 'rgb(100, 130, 167)',
  },
};

export const MyDarkTheme = {
  ...DarkTheme,
  ...DarkThemeElem,
  colors: {
    ...DarkTheme.colors,
    ...DarkThemeElem.colors,
    background: 'rgb(35, 35, 35)',
    card: 'rgb(30, 30, 30)',
    primary: 'rgb(240, 255, 255)',
  },
};
