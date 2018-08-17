import _ from 'lodash';
import * as moment from 'moment';

export const NORD_ADMIN_SID = "S-1-5-21-118107795-1152602752-1039283242-1638376";
export const NORD_USER_SID = "S-1-5-21-118107795-1152602752-1039283242-1638375";
export const PCP_ADMIN = 'pcp_admin';
export const PCP_USER = 'pcp_user';
export const VALID_USER_ROLES = [PCP_ADMIN, PCP_USER];


export default class PCUser {


    canAccessSupplier = (supplierId) => {

        if (this.isNordstromEmployee) {
            return _.includes(this.groups, NORD_ADMIN_SID) || _.includes(this.groups, NORD_USER_SID);

        }

        const canAccess = this.hasRole(supplierId, PCP_USER) || this.hasRole(supplierId, PCP_ADMIN);

        return canAccess;

    };
    accountEnabled = () => {
        //Check the user's SIDs and make sure they are in one of the right groups.

        if(this.isNordstromEmployee) return _.includes(this.groups, NORD_ADMIN_SID);

        //Gather all the roles of the user
        const roleData = this.getAppRoleData();

        //roles = ["pcp_admin", "pcp_admin", "pcp_user]
        const roles = _(roleData).map('roles').flatten().valueOf();

        const  ok = _.includes(roles, PCP_ADMIN);
        return ok; //If the user is administrator of any vendors, return true.

    }
    canAdminSupplier = (supplierId) => {

        if (this.isNordstromEmployee) {
            return _.includes(this.groups, NORD_ADMIN_SID);
        }

        if (!this.canAccessSupplier(supplierId)) return false;

        return this.hasRole(supplierId, PCP_ADMIN);
    };

    //Laura sent me this: for dep loc report supplier / dept combos: 5090168 / 558; 5106421 / 109; 5096077 / 567; 5119507 / 174
    getSupplierIds = () => {

        const parterIds = _.map(this.groups, (g) => {

            if (g.partner) {
                return g.partner.id;
            }else{
                return null;
            }


        });

        return _.uniq(parterIds.filter((v) => (!!(v) === true)));
    };

    // returns an array of objects looking like [ { partner: { id: 12345, name: "Nike Shoes" }, roles: ["pcp_admin", "pcp_user"] } ]
    getAppRoleData = () => {

        const rg = this.groups.map((group, i) => {

            if (_.isObject(group.partner)) {

                const roles = _(group.roles)
                    .flatten()
                    .map(p => p.name).valueOf();

                const { partner } = group;

                return { partner, roles };
            }

            return null;
        });

        return rg.filter((v) => (!!(v) === true));

    };

    hasRole = (vendorNumber, roleName) => {

        if (!vendorNumber) {
            throw( new Error("vendorNumber not supplied to hasRole()"));
        }
        if (!roleName) {
            throw(new Error('roleName not supplied to hasRole()'));
        }
        if (!_.includes(VALID_USER_ROLES, roleName)) {
            throw(new Error(roleName + ' is not a valid roleName'));
        }

        const appRoles = this.getAppRoleData();

        const matchingRoles = _.find(appRoles, (pr) => {
            if(pr.partner.id == vendorNumber) {
                if(_.includes(pr.roles, roleName)){
                    return pr;
                }
            }
        });

        return !!matchingRoles;

    };

    constructor(nuser) {

        this.isNordstromEmployee = nuser.isNordstromEmployee;

        this.accessToken = nuser.accessToken;

        const { userInfo } = nuser;
        if(this.isNordstromEmployee){

            this.sub = nuser.userInfo.sub;
            this.displayName = nuser.userInfo.name;
            this.user = nuser.userInfo.user;
            this.groups = nuser.userInfo.group_sids;
        }else{

            const profile = userInfo.profile;
            this.groups = userInfo.groups;
            this.sub = userInfo.id;
            this.displayName = profile.name;
            this.user = profile.email;

        }


    }
}
