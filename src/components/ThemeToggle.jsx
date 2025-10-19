import { useTheme } from '../ThemeContext.jsx'

const ThemeToggle = () => {
  const { currentTheme, switchTheme, themes } = useTheme()

  return (
    <div className="absolute left-4 top-4 z-[1800]">
      <div className="relative">
        <select
          value={currentTheme}
          onChange={(e) => switchTheme(e.target.value)}
          className="appearance-none rounded-md border border-gray-300 bg-white/90 px-3 py-1.5 pr-8 text-sm font-medium text-gray-800 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border-medium)',
            color: 'var(--color-text-primary)'
          }}
        >
          {Object.entries(themes).map(([key, theme]) => (
            <option key={key} value={key}>
              {theme.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default ThemeToggle







