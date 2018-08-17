import React, {Component} from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Supplier_Report from "./SupplierReportsUserGuide.pdf";
import SupplierReportsUserGuide from "./Supplier_Report.xlsm";

class Nav extends Component {
    constructor(){
        super();
        this.onLogoutClick = this.onLogoutClick.bind(this);

    }

    onLogoutClick = event => {
        event.preventDefault();

        this.props.handleLogout(this.props.user.accessToken);
    };

    logoutLink(){

        return (this.props.loggingOut) ?
            <li><i className="fa fa-fw fa-hourglass-half"></i> Logging out...</li>

             :
            <li><a className='logout' style={{  cursor: "pointer"}} onClick={this.onLogoutClick} ><i className="fa fa-fw fa-power-off" /> Log Out</a></li>
    }

    accountLink(){
        return   this.props.user && this.props.user.accountEnabled() && this.props.accountUrl ?  (<li> <a href={this.props.accountUrl} target="_new"><i className="fa fa-fw fa-user"></i> Account</a></li>) : null
    }

    loginLink(){
        if(this.props.loggingIn) return null;
        if(this.props.user) return null;
        if(this.props.gettingLoginUrl === false && !this.props.loginUrl) {
            return <li><i className="fa fa-fw fa-exclamation-triangle"></i> Unable to log in</li>
        }
        if(this.props.gettingLoginUrl) {
            return <li><a className="login" href={this.props.loginUrl}><i className="fa fa-fw fa-laptop"></i> Log In</a></li>
        }
        if(this.props.loginUrl && !this.props.gettingLoginUrl) {

            return <li><a className="login" href={this.props.loginUrl}><i className="fa fa-fw fa-laptop"></i> Log In</a></li>
        }
    }

    render(){
        const { user, loading, accountUrl } = this.props;

        const pathname = this.props.history.location.pathname;
        const isLoginPage = pathname.indexOf("login") > -1;
        const isSuppliersPage = pathname.indexOf("suppliers") > -1;
        const isUsersPage = pathname.indexOf("users") > -1;
        const isReposPage = pathname.indexOf("repos") > -1;
        return (
            <div className="leftnav">
                <ul className="links">
                    {this.loginLink()}
                    {user ? <li><Link to={"/"}><i className="fa fa-fw fa-cubes"></i>Reports</Link></li> : null }
                    {user ? this.accountLink() : null }

                    <li><a href="https://portal.nordstrom.com/pwred-pub/access/Login.do" target="_compliance"><i className="fa fa-fw fa-list-alt"></i><span className="longtext">Supplier Portal</span></a></li>
                    <li><a href="http://www.nordstromsupplier.com" target="_compliance"><i className="fa fa-fw fa-list-alt"></i><span className="longtext">Supplier Compliance - US</span></a></li>
                    <li><a href="http://nordstromsuppliercanada.com/" target="_compliance"><i className="fa fa-fw fa-list-alt"></i><span className="longtext">Supplier Compliance - CA</span></a></li>
                    <li><a href="http://www.nordstromsupplier.com/NPG/" target="_compliance"><i className="fa fa-fw fa-list-alt"></i><span className="longtext">NPG Procedures/Manuals</span></a></li>
                    <li><a href={require("./Supplier_Report.xlsm")} download="TEMPLATE_Supplier_Report_v5_1006.xlsm"><i className="fa fa-fw fa-list-alt"></i><span className="longtext">Canada Selling Macro</span></a></li>
                    <li><a href="https://portal.nordstrom.com/pwred-includes/documents/NordstromCanadaSupplierReportingInfoforPortalv2.pdf" target="_compliance"><i className="fa fa-fw fa-list-alt"></i><span className="longtext">Canada Selling FAQ</span></a></li>
                    <li><a href={require("./SupplierReportsUserGuide.pdf")} download="SupplierReportsUserGuide.pdf"><i className="fa fa-fw fa-list-alt"></i><span className="longtext">User Guide</span></a></li>
                    <li><Link to={"/faq"}><i className="fa fa-fw fa-question"></i>FAQ</Link></li>
                    <li><Link to={"/contact"}><i className="fa fa-fw fa-address-card"></i>Contact Nordstrom</Link></li>
                    {user ? this.logoutLink() : null }
                </ul>
            </div>
        )
    }

}


Nav.propTypes = {
    user: PropTypes.object,
    loginUrl: PropTypes.string,
    logoutUrl: PropTypes.string,
    accountUrl: PropTypes.string,
    loggingOut: PropTypes.bool,
    loggingIn: PropTypes.bool,
    loading: PropTypes.bool,
    handleLogout: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    gettingLoginUrl: PropTypes.bool
};
export default withRouter(Nav);
