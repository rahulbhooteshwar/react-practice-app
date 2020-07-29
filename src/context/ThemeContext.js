import React from 'react';
import { useState } from 'react';
export const ThemeContext = React.createContext();

export const ThemeProvider = ({children}) => {
  const themes = ['light', 'dark']
  const [currentTheme, setCurrentTheme] = useState('light')
  return <ThemeContext.Provider value={{currentTheme, setCurrentTheme, themes}}>{children}</ThemeContext.Provider>
}