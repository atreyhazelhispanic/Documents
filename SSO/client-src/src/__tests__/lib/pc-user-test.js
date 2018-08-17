import PCUser from '../../utils/PCUser';
import employee from '../../utils/fakes/employee';
import useradmin from '../../utils/fakes/useradmin';
import smurf from '../../utils/fakes/smurf';
import expect from 'expect'; // You can use any testing library
import * as _ from 'lodash';
import { NORD_ADMIN_SID} from "../../utils/PCUser";

describe('PCUser tests', ()=> {
    var pcEmployee, pcUser, pcUserAdmin;


    var mockEmployeeContract = employee;


    beforeEach(()=> {
        pcEmployee = new PCUser(employee);
        pcUser = new PCUser(smurf);
        pcUserAdmin = new PCUser(useradmin);


    });

    it('should initialize a nordstrom employee user', ()=> {
        expect(pcEmployee.isNordstromEmployee).toEqual(true);
        expect(pcEmployee.sub).toEqual("00ueedzxukl1myx3E0h7");
        expect(pcEmployee.displayName).toEqual("Abhishek Ransingh");
        expect(pcEmployee.user).toEqual("BTLA");
        expect(pcEmployee.groups[3]).toEqual("S-1-5-21-118107795-1152602752-1039283242-1180202");
    });

    it('should initialize an external user', () => {
        expect(pcUser.sub).toEqual("auth0|5abc1f6a3d88ef7b8ca3a10b");
        expect(pcUser.displayName).toEqual("Mohandas Kannan");
        expect(pcUser.user).toEqual("mohandas.kannan@gmail.com");
        expect(pcUser.groups.length).toEqual(1);
    });

    describe('canAccessSupplier', () => {
        it('should not label a non-employee as an employee', ()=>{
            expect(pcUser.isNordstromEmployee).toEqual(false);
            expect(pcUserAdmin.isNordstromEmployee).toEqual(false);
        });
        it('should allow employees to access any supplier', () => {
            const subject = pcEmployee.canAccessSupplier(12345);
            expect(subject).toEqual(true);
        });
        it('should not allow a non-employee to access any supplier', ()=> {
            const subject = pcUser.canAccessSupplier(12345);
            expect(subject).toEqual(false);
        });
        it('should not allow a non-employee admin to access any supplier', ()=> {
            const subject = pcUserAdmin.canAccessSupplier(12345);
            expect(subject).toEqual(false);
        });
        it('should allow a non-employee to access a vendor he is associated with', () => {

            const subject = pcUser.canAccessSupplier(5104600);
            expect(subject).toEqual(true);
        });
        it('should allow a non-employee admin to access a vendor he is associated with', () => {

            const subject = pcUserAdmin.canAccessSupplier(150644198);
            expect(subject).toEqual(true);
        });
    });

    describe('canAdminSupplier', ()=> {
        it('should allow a user to admin a supplier he is associated with when he is an admin', () => {
            const subject = pcUserAdmin.canAdminSupplier(150644198);
            expect(subject).toEqual(true);
        });
        it('should not allow a user to admin a supplier he is associated with when he is not an admin', () => {
            const subject = pcUser.canAdminSupplier(150644198);
            expect(subject).toEqual(false);
        });
        it('should allow a nordstrom employee with the NORD_ADMIN_SID to administrate any supplier', () => {
            const subject = pcEmployee.canAdminSupplier(150644198);
            expect(subject).toEqual(true);
        });

    });


    describe('getAppRoleData', () => {
        it('should return a properly-shaped array of role data objects for non-admin user', ()=>{
            const subject = pcUser.getAppRoleData();
            expect(subject).toEqual([ { partner: { name: 'CP-NIKE FOOTWEAR', id: '5104600' }, roles: [ 'pcp_user' ] } ]   );
        });
        it('should return a properly-shaped array of role data objects for admin user', ()=>{
            const subject = pcUserAdmin.getAppRoleData();
            expect(subject).toEqual([ { partner: { id: '150644198', name: 'Nike' }, roles: [ 'pcp_admin' ] }, { partner: { id: '449945782', name: 'Adidas' }, roles: [ 'pcp_admin' ] }, { partner: { id: '150644198', name: 'Nike' }, roles: [ 'pcp_user' ] } ]  );
        });
    });

    describe('hasRole', () => {
        it('should return true when a user has a role for a partner', () => {
            const subject = pcUser.hasRole('5104600', 'pcp_user');
            expect(subject).toEqual(true);
        });
        it('should return true when a user admin has a role for a partner', () => {

            const subject = pcUserAdmin.hasRole('150644198', 'pcp_admin');
            expect(subject).toEqual(true);
        });
    });

    describe('acccountEnabled', () => {
        it('should return true when a nordstrom employee has the right groups', () => {
            expect(true).toEqual(pcEmployee.accountEnabled());
        });

        it('should not allow employee non-admin', () =>{
            let nonMerch = _.clone(employee);
            nonMerch.userInfo.group_sids = _.without(nonMerch.userInfo.group_sids, NORD_ADMIN_SID);

            let emp = new PCUser(nonMerch);


            expect(false).toEqual(emp.accountEnabled());
        });
        it('should return true when the non-employee user is a user admin', () => {
            expect(true).toEqual(pcUserAdmin.accountEnabled());

        });
        it('should return false when the non-employee user is not an admin', ()=>{
            expect(false).toEqual(pcUser.accountEnabled());
        });

    })


});