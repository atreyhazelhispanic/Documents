import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { connect } from "react-redux";
import EmployeeLanding from "./EmployeeLanding";
import SupplierLanding from "./SupplierLanding";
import ReactMarkdown from "react-markdown";

import cover1a from './cover1a.jpg';
import cover2a from './cover2a.jpg';
import cover3a from './cover3a.jpg';
import cover3b from './cover3b.jpg';

export class DefaultLandingPage extends Component {

  render(){
    //console.log('this.props', this.props);
    const { content } = this.props;
    //console.log("content =>", content);
     return ( <div className="landing motd">
            <h1>Welcome to Supplier Reports</h1>
             <ReactMarkdown source={content} />
             <hr />
             <div className="images">
               <img src={cover1a} />
               <img src={cover2a} />
               <img src={cover3a} />
               <img src={cover3b} />
               </div>
        </div>
     )
  }
}

export class AuthenticatedLandingPage extends Component {

  render(){
   
    if(this.props.user.isNordstromEmployee)
    {
      return <EmployeeLanding history={this.props.history} user={this.props.user} />;
    }else{
      
      return <SupplierLanding history={this.props.history}  user={this.props.user}  />;
    }
  }
}
export class Home extends Component {

  render() {

    var page = this.props.user ? <AuthenticatedLandingPage history={this.props.history}  suppliers={this.props.suppliers}  user={this.props.user} /> : <DefaultLandingPage history={this.props.history} content={this.props.content}  />;
    if(this.props.loading)
    {
      page = <h1 style={{ "marginLeft" : "90px" }}>Logging you in...</h1>
    }
    return (
      <div>
          <div className="container">
               {page}
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn, user } = state.auth;
  const { home } = state.content;

  return {
    loading: loggingIn,
    user: user,
    content: home

  };
}
export default connect(mapStateToProps, {  })(Home);
