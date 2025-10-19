export const themes = {
  cafe: {
    name: 'Hand-Drawn Cafe',
    colors: {
      primary: '#333399', // Medium-dark blue from the illustrations
      secondary: '#4A4A9C', // Slightly lighter blue variant
      background: '#FFFFFF', // Clean white background
      surface: '#FFFFFF', // Clean white surfaces
      accent: '#5B5BA8', // Lighter blue accent
      text: {
        primary: '#1F2937', // Clean dark gray for main text
        secondary: '#4B5563', // Medium gray for secondary text
        muted: '#6B7280' // Light gray for muted text
      },
      border: {
        light: '#E5E7EB', // Clean light gray borders
        medium: '#D1D5DB', // Medium gray borders
        dark: '#9CA3AF' // Darker gray borders
      },
      success: '#228B22', // Forest green
      warning: '#FF8C00', // Dark orange
      error: '#DC143C' // Crimson
    },
    fonts: {
      heading: 'Sniglet, cursive', // Playful, hand-drawn font for headings
      body: 'Poppins, system-ui, sans-serif' // Clean, modern Poppins for body text
    },
    shadows: {
      sm: '0 2px 4px rgba(51, 51, 153, 0.08)',
      md: '0 4px 8px rgba(51, 51, 153, 0.12)',
      lg: '0 8px 16px rgba(51, 51, 153, 0.16)'
    }
  }
}

// CSS variables for the cafe theme
export const getThemeCSS = (theme) => {
  const colors = theme.colors
  return `
    :root {
      /* Colors */
      --color-primary: ${colors.primary};
      --color-secondary: ${colors.secondary};
      --color-background: ${colors.background};
      --color-surface: ${colors.surface};
      --color-accent: ${colors.accent};
      --color-text-primary: ${colors.text.primary};
      --color-text-secondary: ${colors.text.secondary};
      --color-text-muted: ${colors.text.muted};
      --color-border-light: ${colors.border.light};
      --color-border-medium: ${colors.border.medium};
      --color-border-dark: ${colors.border.dark};
      --color-success: ${colors.success};
      --color-warning: ${colors.warning};
      --color-error: ${colors.error};
      
      /* Fonts */
      --font-heading: ${theme.fonts.heading};
      --font-body: ${theme.fonts.body};
      
      /* Shadows */
      --shadow-sm: ${theme.shadows.sm};
      --shadow-md: ${theme.shadows.md};
      --shadow-lg: ${theme.shadows.lg};
    }
    
    /* Apply fonts */
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-heading);
    }
    
    body {
      font-family: var(--font-body);
      background-color: var(--color-background);
      color: var(--color-text-primary);
    }
  `
}
