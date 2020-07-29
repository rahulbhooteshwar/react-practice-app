import React from 'react';
import { useState } from 'react';
export const LocaleContext = React.createContext();

export const LocaleProvider = ({ children }) => {
  const localeList = [
    {id: 'en-us', 'text': 'English-United States'},
    {id: 'en-gb', 'text': 'English- Great Brittain'},
    {id: 'en-ca', 'text': 'English-Canada'}
  ];
  const [locale, setLocale] = useState(localeList[1]);
  return <LocaleContext.Provider value={{ locale, setLocale, localeList }}>{children}</LocaleContext.Provider>
}