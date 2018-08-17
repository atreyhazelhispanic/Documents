import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import UserProfile from "./UserProfile";

import nord_logo_black from "./nord_logo_black.png";

import "./header.css";

class Header extends Component {



  render() {
    const { user } = this.props;

    return          <div className="apphead">
            <div className="lefthead"><Link className="navbar-brand brand" to={ "/" }><img src={nord_logo_black} /></Link></div>

            <div className="righthead">
              <appName>Supplier Reports</appName>
              {user ? <username><span className="fa fa-fw fa-user"></span>{user.displayName}</username> : null}
              </div>


    </div   > ;
  }
}

Header.propTypes = {
    user: PropTypes.object
};

export default withRouter(Header);
