import React from "react";
import { Link } from "react-router-dom";

import "./footer.css";
  {/*
    <footer className="footer">
    <div className="container">
      <p className="text-xs-center text-muted">
        Have questions or suggestions? Please file them on the
        {" "}<a
          href="https://github.com/cloudmu/react-redux-starter-kit/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>{" "}
        or tweet
        <a
          href="http://www.twitter.com/_cloudmu"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}me
        </a>
        .
      </p>
    </div>
  </footer>
*/}
const Footer = () => (
  <footer>
  
 <Link to={"/terms"}>Supplier Reports User Agreement</Link>&nbsp;|&nbsp;
  &copy; 2018 Nordstrom, Inc.
  
  </footer>
);

export default Footer;
