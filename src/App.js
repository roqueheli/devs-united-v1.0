import './styles/App.css';
import Login from './components/Login/Login';
import { Route, Switch } from 'react-router-dom';
import Main from './components/Main/Main';
import Favorites from './components/Favorites/Favorites';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/main" component={Main} />
        <Route exact path="/favorites" component={Favorites} />
      </Switch>
    </>
  );
}

export default App;
