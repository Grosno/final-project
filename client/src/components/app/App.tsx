import React, { useContext } from 'react';
import {
  HashRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import Header from '../header/Header';
import './App.scss';
import { Footer } from '../footer/Footer';
import CardsList from '../../forms/cards-list/CardsList';
import Paginator from '../pagination/Paginator';
import UsersPosts from '../../forms/users-posts/UsersPosts';
// eslint-disable-next-line import/no-named-as-default-member
import Location from '../location/Location';
// eslint-disable-next-line import/no-named-as-default-member
import LogInForm from '../../forms/log-in/LogIn';
import Registration from '../../forms/registration/Registration';
import UserProfile from '../../forms/user-profile/UserProfile';
import { ThemeContext } from '../contexts/DarkTheme';

const App = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <HashRouter>
      <div className={`container ${themeContext.darkTheme && 'container_dark-theme'}`}>
        <Location />
        <Header />
        <div className="content">
          <Switch>
            <Route exact path="/users">
              <CardsList />
              <Paginator />
            </Route>
            <Route exact path="/posts">
              <UsersPosts />
              <Paginator />
            </Route>
            <Route exact path="/login">
              <LogInForm />
            </Route>
            <Route exact path="/registration">
              <Registration />
            </Route>
            <Route exact path="/user/:id">
              <UserProfile />
            </Route>
          </Switch>
          <Redirect to="/login" />
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
