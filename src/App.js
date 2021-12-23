import Login from './components/Login/Login';
import Main from './components/Main/Main';
import NotFound from './components/Main/NotFound';
import Favorites from './components/Favorites/Favorites';
import MainUserFeed from './components/UserFeed/MainUserFeed';
import { Route, Switch } from 'react-router-dom';
import './styles/App.css';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/main">
          <Main />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
        <Route path="/userfeed">
          <MainUserFeed />
        </Route>
        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
