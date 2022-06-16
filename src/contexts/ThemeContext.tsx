import { createContext, ReactNode, useState } from 'react';

type ThemeMode = 'light' | 'dark';

type ThemeContextProps = {
  themeMode: ThemeMode;
  setThemeMode: (theme: ThemeMode) => void;
}

type ThemeProviderProps = {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
