import React from 'react';
import Header from './Header';
import UserInfo from './UserInfo';
import Selections from './Selections.jsx';

function Main() {
    return (
      <div className="App">
        <Header />
        <UserInfo />
        <Selections />
      </div>);
  }

export default Main;
