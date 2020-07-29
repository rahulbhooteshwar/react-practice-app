import React, { useContext } from 'react'
import { LocaleContext } from '../context/LocaleContext';

const LocaleSelector = () => {
  const { localeList, setLocale, locale } = useContext(LocaleContext);
  const updateLocale = e => {
    console.log(e.target.value)
    const selectedLocale = localeList.find(item => item.id === e.target.value)
    setLocale(selectedLocale)
  }
  return (
    <select value={locale.id} onChange={updateLocale}>
      {
        localeList.map((localeItem, index) => {
          return <option value={localeItem.id} key={index + localeItem.id}>
            {localeItem.text}
          </option>
        })
      }
    </select>
  )
}

export default LocaleSelector
