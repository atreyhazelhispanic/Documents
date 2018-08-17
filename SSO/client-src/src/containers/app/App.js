import React, { Component } from "react";
import PropTypes from "prop-types";


/////////////////////////////////////////////////////////////////////////
// BrowserRouter would be preferred over HashRouter, but BrowserRouter
// would require configuring the server. So we will use HashRouter here.
// Please change to BrowserRouter if you have your own backend server.
///////////////////////////////////////////////////////////////////////////
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "isomorphic-fetch";
import { connect } from "react-redux";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import FAQ from '../doc/FAQ';
import TOU from '../doc/TOU';
import CONTACT from '../doc/CONTACT';

import PrivateRoute from "../misc/PrivateRoute";
import AuthExpired from "../misc/AuthExpired";
import Home from "../home/Home";
import Nav from "../../components/nav/Nav";

import ReportsPage from "../suppliers/ReportsPage";

import NotFound from "../misc/NotFound";

import { loadIdToken, getProfile, getConfig, isTokenExpired } from '../../utils/apiUtils';
import { getClaims } from '../../utils/authUtils';
import { getLoginUrl, getLogoutUrl, goHome } from '../../actions/auth';

import { createBrowserHistory } from 'history';

import { logout ,exchangeCodeAndState } from "../../actions/auth";

import "./app.css";
const history = createBrowserHistory();

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
  //  console.log('Query variable %s not found', variable);
}


class App extends Component {

  handleLogout(accessToken) {

    this.props.dispatch(logout(accessToken));
  }
  doProfile(){
    const user = getProfile();
    const claims = getClaims(user);
    alert(`
        user: ${claims.sub},
        email: ${claims.email},
        roles: ${claims.roles},
        groups: ${claims.groups},
        permissions: ${claims.permissions}

    `)
  }

  componentWillReceiveProps(nextProps) {

    const user = loadIdToken();

    if( user && this.props.authExpired) {

      history.push('/#/expired');
    }

  }

  async componentWillMount() {
    await getConfig();

    const user = loadIdToken();

    const code = getQueryVariable('code');

    if(!user && code) {
        const authstate = getQueryVariable('state');

        this.props.dispatch(exchangeCodeAndState(code, authstate, history));
        //this.props.dispatch(goHome(history));

    }

    console.log('App component will mount');
    this.props.dispatch(getLoginUrl());

    /*
    This code should happen without a dispatch/digest cycle.
    */

  }
  render() {


    var user = getProfile();


    const isAuthenticated = true && user;
    const isExpired = this.props.authExpired;
    let accountUrl = window.Environment ? window.Environment.accountUrl : null;


    var userName = null;
    if(isAuthenticated) {

      userName = user['user'];
      accountUrl += '/callback';
    }
    return (
      <Router history={history}>
        <div >
          <div>
            <Header user={user||null}  />
            <div className="appContent">
              <div className="leftpanel" >
                <Nav user={user != false ? user : null} accountUrl={accountUrl} gettingLoginUrl={this.props.gettingLoginUrl} loading={this.props.loading} dispatch={this.props.dispatch} loggingIn={this.props.loggingIn} loggingOut={this.props.loggingOut} loginUrl={this.props.loginUrl} doProfile={() => this.doProfile()} handleLogout={(accessToken) => this.handleLogout(accessToken) }  />
              </div>
              <div className="contentpanel">
                <Switch>
                  <Route exact path="/" component={Home} />
                    <Route exact path="/faq" component={FAQ} />
                    <Route exact path="/terms" component={TOU} />
                    <Route exact path="/contact" component={CONTACT} />
                  <Route exact path="/expired" loginUrl={this.props.loginUrl} component={AuthExpired} />
                  <PrivateRoute
                    path="/reports/:supplierId"
                    isAuthenticated={isAuthenticated}
                    isExpired={isExpired}
                    logoutUrl={this.props.logoutUrl} loginUrl={this.props.loginUrl}
                    component={ReportsPage}
                  />

                  <Route component={NotFound} />
              </Switch>
            </div>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

App.contextTypes = {
  store: PropTypes.object.isRequired
};

const mapStateToProps = state => {

  const { auth } = state;
  return {
    user: auth && auth.user ? auth.user : null,
    loginUrl: auth.loginUrl,
    loggingOut: auth.loggingOut,
    loggingIn: auth.loggingIn,
    authExpired: auth.expired,
    loading: auth.loggingIn,
    gettingLoginUrl: auth.gettingLoginUrl
  };
};

export default connect(mapStateToProps)(App);
