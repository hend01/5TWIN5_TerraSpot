// project import
import '@fortawesome/fontawesome-free/css/all.min.css';
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ThemeCustomization>
    <ScrollTop>
      <Routes />
    </ScrollTop>
  </ThemeCustomization>
);

export default App;
