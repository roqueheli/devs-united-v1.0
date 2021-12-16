import { Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import NotFound from './components/Main/NotFound';
import Favorites from './components/Favorites/Favorites';
import MainUserFeed from './components/UserFeed/MainUserFeed';
import './styles/App.css';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/main" component={Main} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/userfeed" component={MainUserFeed} />
        <Route path="/" component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
