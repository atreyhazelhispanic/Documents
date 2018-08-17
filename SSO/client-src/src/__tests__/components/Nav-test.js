//        it('renders Log In link', () => {
//             wrapper = mount(
//                 <Router history={createBrowserHistory()} >
//                   <Header user={null} gettingLoginUrl={false} loading={false} dispatch={() => {}} handleLogout={myLogout} logoutUrl="http://logout_url" loginUrl="http://login_url" />
//                 </Router>
//               );
//             const login = wrapper.find('a.login');
//             expect(login.text()).to.equal('Log In');
//             expect(login.props().href).to.equal("http://login_url")
//         });


import React from 'react';
import { expect } from 'chai'
import {shallow, mount, render, configure} from 'enzyme';
import { Router } from "react-router";
import Adapter from 'enzyme-adapter-react-15';
import Nav from '../../components/nav/Nav';
import ReactTestUtils from 'react-dom/test-utils';
import { createBrowserHistory } from 'history';
import PCUser from '../../utils/PCUser';
import useradmin from '../../utils/fakes/useradmin';

configure({ adapter: new Adapter() })

const history = {
    push: () => {}
};

describe('<Nav />', () => {
            const testUser = new PCUser(useradmin);
            testUser.accountEnabled = function(){ return true; }

           it('renders Log In link', () => {

            const wrapper = mount(
                <Router history={createBrowserHistory()} >
                  <Nav user={null} gettingLoginUrl={false} loading={false} dispatch={() => {}} handleLogout={()=>{}} logoutUrl="http://logout_url" loginUrl="http://login_url" />
                </Router>
              );
            const login = wrapper.find('a.login');
            expect(login.text()).to.equal(' Log In');
            expect(login.props().href).to.equal("http://login_url")
        });

        it('renders log out link when there is a user', () => {
           const wrapper = mount(
                <Router history={createBrowserHistory()} >
                  <Nav user={testUser} gettingLoginUrl={false} loading={false} dispatch={() => {}} handleLogout={()=>{}} logoutUrl="http://logout_url" loginUrl="http://login_url" />
                </Router>
              );
            const logout = wrapper.find('a.logout');
            expect(logout.length).to.equal(1);
            expect(typeof(logout.props().onClick)).to.equal('function');

            expect(logout.text()).to.equal(' Log Out');

        });

        it('does not render log in link when there is a user', () => {
            const wrapper = mount(
                <Router history={createBrowserHistory()} >
                    <Nav user={testUser} gettingLoginUrl={false} loading={false} dispatch={() => {}} handleLogout={()=>{}} logoutUrl="http://logout_url" loginUrl="http://login_url" />
                </Router>
            );

            const login = wrapper.find('a.login');
            expect(login.length).to.equal(0);
        });
});
