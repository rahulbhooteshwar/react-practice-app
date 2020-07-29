import React from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const ThemeSelector = () => {
  const { currentTheme, setCurrentTheme, themes } = useContext(ThemeContext)
  return (
    <select value={currentTheme} onChange={(e) => setCurrentTheme(e.target.value)}>
      {
        themes.map(
          (theme, index) => <option key={theme + index} value={theme}>{theme}</option>
        )
      }
    </select>
  )
}

export default ThemeSelector
