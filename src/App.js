import Login from './components/Login/Login';
import Main from './components/Main/Main';
import NotFound from './components/Main/NotFound';
import Favorites from './components/Favorites/Favorites';
import MainUserFeed from './components/UserFeed/MainUserFeed';
import { AnimatedRoutes, RouteTransition } from './animation/Animation';
import './styles/App.css';

function App() {
  return (
    <>
      <AnimatedRoutes exitBeforeEnter initial={false}>
        <RouteTransition exact path="/">
          <Login />
        </RouteTransition>
        <RouteTransition exact path="/main">
          <Main />
        </RouteTransition>
        <RouteTransition exact path="/favorites">
          <Favorites />
        </RouteTransition>
        <RouteTransition exact path="/userfeed">
          <MainUserFeed />
        </RouteTransition>
        <RouteTransition path="/">
          <NotFound />
        </RouteTransition>
      </AnimatedRoutes>
    </>
  );
}

export default App;
