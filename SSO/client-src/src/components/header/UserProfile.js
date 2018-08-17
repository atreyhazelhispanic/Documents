import React from "react";
import PropTypes from "prop-types";

const UserProfile = ({ user, handleLogout }) => {
  const userMenu = (      <ul className="dropdown-menu" style={{ right: 0, left: "auto" }}>
        <a
          className="dropdown-item"
          href="#"
          target="_blank"
          title="User Profile"
          rel="noopener noreferrer"
        >
          <i className="fa fa-user" style={{ marginRight: "0.5em" }} /> User Profile
        </a>
        <div className="dropdown-divider" />

        <a className="dropdown-item" href="" onClick={handleLogout}>
          <i className="fa fa-sign-out" style={{ marginRight: "0.5em" }} />
          Log out
        </a>
      </ul>);
    
    const anonMenu = (
            <ul className="dropdown-menu" style={{ right: 0, left: "auto" }}>
        <a className="dropdown-item" href="" onClick={handleLogout}>
          <i className="fa fa-sign-out" style={{ marginRight: "0.5em" }} />
          Log In
        </a>
      </ul>
    )


  return (
    <li className="dropdown nav-item">
      <a
        href=""
        className="dropdown-toggle nav-link"
        data-toggle="dropdown"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {user || "Anonymous"}
        <span className="caret" />
      </a>
      {user ? (userMenu) : anonMenu}
    </li>
  );
};

UserProfile.propTypes = {
  user: PropTypes.string,
  handleLogout: PropTypes.func.isRequired
};

export default UserProfile;
