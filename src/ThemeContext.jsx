import { createContext, useContext, useState, useEffect } from 'react'
import { themes, getThemeCSS } from './themes.js'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('cafe')

  // Apply theme CSS to document
  useEffect(() => {
    const theme = themes[currentTheme]
    const css = getThemeCSS(theme)
    
    // Remove existing theme style
    const existingStyle = document.getElementById('theme-style')
    if (existingStyle) {
      existingStyle.remove()
    }
    
    // Add new theme style
    const style = document.createElement('style')
    style.id = 'theme-style'
    style.textContent = css
    document.head.appendChild(style)
    
    // Save theme preference
    localStorage.setItem('theme', currentTheme)
  }, [currentTheme])

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme)
    }
  }, [])

  const switchTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName)
    }
  }

  const value = {
    currentTheme,
    switchTheme,
    themes
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
