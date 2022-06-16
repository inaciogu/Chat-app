import Router from 'routes';
import GlobalStyles from 'styles/global';
import ThemeConfig from 'styles/theme';

function App() {
  return (
    <ThemeConfig>
      <GlobalStyles />
      <Router />
    </ThemeConfig>
  );
}

export default App;
