import React from 'react';
import { expect } from 'chai'
import {shallow, mount, render, configure} from 'enzyme';
import { Router } from "react-router";
import Adapter from 'enzyme-adapter-react-15';
import SupplierReport from '../../components/suppliers/SupplierReport';
import ReactTestUtils from 'react-dom/test-utils';
import { createBrowserHistory } from 'history';
import * as test_data from '../../utils/fakes/reports';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';

const { regions, reports } = test_data.default;
const testReport = reports[0];
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


const history = {
    push: () => {},
    location: "",
    listen: () => {}
};
configure({ adapter: new Adapter() });

describe('<SupplierReport />', () => {

    describe('Basic rendering', () => {
        var wrapper;
        beforeEach(() => {
            wrapper = mount(
                <Provider store={mockStore()}>
                    <Router history={createBrowserHistory()} >
                        <SupplierReport  supplierId={1223}
                                         departmentNumber={23}
                                         index={0} key={0}
                                         report={testReport}
                                         regions={regions} />
                    </Router>
                </Provider>
            );

        })



        it('should render a supplier report', () => {
                const title = wrapper.find('span').text();

                expect(title).to.equal(testReport.name);
                expect(wrapper.find('p').length).to.equal(0);

        });
        it('opens when the plus sign is clicked', () => {
            wrapper.find('.plusicon').simulate('click');
            expect(wrapper.find('p').length).to.equal(1);
        });
        it('should render the buttons', () => {
            wrapper.find('.plusicon').simulate('click');
            expect(wrapper.find('button').length).to.equal(2);
            expect(wrapper.find('button').at(0).text()).to.equal(' Generate PDF Report');
            expect(wrapper.find('button').at(1).text()).to.equal(' Generate CSV Report');
        });


    });

})