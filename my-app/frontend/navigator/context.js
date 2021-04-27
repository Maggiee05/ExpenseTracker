import React from 'react';
/**
 * Used for passing global props varaibles between navigators and screens via React Context.
 * Storing the current user
 */

/* eslint-disable import/prefer-default-export */
const UserContext = React.createContext();
const ThemeContext = React.createContext({
  theme: false,
  changeTheme: () => {},
});

export { UserContext, ThemeContext };
