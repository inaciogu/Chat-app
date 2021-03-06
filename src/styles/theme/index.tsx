import { ReactNode, useContext, useMemo } from 'react';
import { ThemeContext } from 'contexts/ThemeContext';
import {
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';

type ThemeConfigProps = {
  children: ReactNode;
}

export default function ThemeConfig({ children }: ThemeConfigProps) {
  const { themeMode } = useContext(ThemeContext);
  const lightMode = themeMode === 'light';

  const theme = createTheme(useMemo(() => ({
    palette: {
      mode: lightMode ? 'light' : 'dark',
    },
  }), [lightMode]));

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
