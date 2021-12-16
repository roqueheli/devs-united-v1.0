import React from 'react';
import Header from './Header';
import UserFeedInfo from './UserFeedInfo';
import UserFeed from './UserFeed';

function MainUserFeed() {
    return (
      <div className="App">
        <Header />
        <UserFeedInfo />
        <UserFeed />
      </div>);
  }

export default MainUserFeed;
