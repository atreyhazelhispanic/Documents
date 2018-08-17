
import React from 'react';
import { expect } from 'chai'
import {shallow, mount, render, configure} from 'enzyme';
import { Router } from "react-router";
import Adapter from 'enzyme-adapter-react-15';
import Header from '../../components/header/Header';
import ReactTestUtils from 'react-dom/test-utils'; 
import { createBrowserHistory } from 'history';
import PCUser from '../../utils/PCUser';
import useradmin from '../../utils/fakes/useradmin';

configure({ adapter: new Adapter() })

const history = {
    push: () => {}
};

describe('<Header />', () => {
    const myLogout = () => {};

    describe('All scenarios', () => {
         const wrapper = mount(
            <Router history={createBrowserHistory()} >
              <Header user={null} dispatch={() => {}} />
            </Router>
          );

       it('renders the brand link ', () => {
            expect(wrapper.find('appName').text()).to.equal('Supplier Reports');
        });
    });


    describe('Logged in rendering', () => {
        const testUser = new PCUser(useradmin);
        testUser.accountEnabled = function(){ return true; }
        const wrapper = mount(
            <Router history={createBrowserHistory()} >
              <Header user={testUser} gettingLoginUrl={false} loading={false} dispatch={() => {}} handleLogout={myLogout} logoutUrl="http://logout_url" loginUrl="http://login_url" />
            </Router>
          );


        it('renders the user display name', () =>{
            const username = wrapper.find('username');
            expect(username.length).to.equal(1);
            expect(username.text()).to.equal('Mohandas Kannan');
        });
    });

    describe('Anonymous rendering', () => {
        var wrapper ;
    

        it('renders home link ', () => {
            wrapper = mount(
                <Router history={createBrowserHistory()} >
                  <Header user={null} gettingLoginUrl={false} loading={false} dispatch={() => {}} handleLogout={myLogout} logoutUrl="http://logout_url" loginUrl="http://login_url" />
                </Router>
              );
            const links = wrapper.find('a');
            //Home, Log In
            expect(links.length).to.equal(1);
        });

    });

});
