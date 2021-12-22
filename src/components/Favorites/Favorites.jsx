import React, { useContext } from 'react';
import { FirestoreContext } from '../../context/firestoreContext';
import Header from './Header';
import UserInfo from './UserInfo';
import Selections from './Selections.jsx';
import Loading from '../Loader/Loading';

function Main() {

  const { loading } = useContext(FirestoreContext);
  return (
    <div className="App">
      <Header />
      <UserInfo />
      {!loading ? <Loading /> : <Selections />}
    </div>);
  }

export default Main;
