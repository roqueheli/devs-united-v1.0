import React from 'react';
import Header from './Header';
import Tweetbox from './Tweetbox';
import Feed from './Feed.jsx';

function Main() {
    return (
      <div className="App">
        <Header />
        <Tweetbox />
        <Feed />
      </div>);
  }

export default Main;
