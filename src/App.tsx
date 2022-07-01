import Router from 'routes';
import GlobalStyles from 'styles/global';
import { SnackbarProvider } from 'notistack';
import ThemeConfig from 'styles/theme';

function App() {
  return (
    <ThemeConfig>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'right', vertical: 'top' }} autoHideDuration={3000}>
        <GlobalStyles />
        <Router />
      </SnackbarProvider>
    </ThemeConfig>
  );
}

export default App;
