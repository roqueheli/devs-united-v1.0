import React, { useContext } from 'react';
import { FirestoreContext } from '../../context/firestoreContext';
import Header from './Header';
import UserFeedInfo from './UserFeedInfo';
import Loading from '../Loader/Loading';
import UserFeed from './UserFeed';

function MainUserFeed() {
  const { loading } = useContext(FirestoreContext);
  return (
    <div className="App">
      <Header />
      <UserFeedInfo />
      {!loading ? <Loading /> : <UserFeed />}
    </div>);
  }

export default MainUserFeed;
