import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";
import { getSuppliers } from "../../actions/suppliers";


class SupplierLanding extends Component {
  
    componentWillMount() {
        if(this.props.user){
              this.props.getSuppliers(this.props.user.getSupplierIds());
        }
    }
    isAdmin(supplier) {
        const { user } = this.props;

        if(user.hasRole(supplier.id, 'pcp_admin')) {
            return <span className="adminLabel">admin</span>
        }

        return null;

    }
  render(){
      const { suppliers, user, loadingSuppliers } = this.props;

    // console.log('supplier landing user', user, 'suppliers', suppliers);

    const supplierPopulatedContent = (<ul className="landing">
        <legend>Welcome, {user.displayName}!</legend>
        <p>Please select the supplier you wish to report on from the list below:</p>
        {
            suppliers.map((s, i) => {
              return (<li key={i}><Link to={ "/reports/"+s.id}>
              <span className="fa fa-building-o" ></span> {this.isAdmin(s)}
                  {s.name} (<span className="vendorNumber">{s.id}</span>)</Link></li>);
            })
        }
    </ul>)

    const supplierEmptyContent = (<div className="container">
        <h3>Welcome, {user.displayName}!</h3>
        <Alert bsStyle="warning">
            <strong>Warning!</strong> We are unable to retrieve any supplier records associated to the account you are logged in as.
        </Alert>
                
        <p className="center">There are a couple of reasons you may see this error. Either you don't have any suppliers associated to your account, or we are experiencing a system outage.</p>
     </div>);
     if(loadingSuppliers === true && !suppliers.length){
         return <div className="suppliersLoading"><div className="alert alert-info"><span className="fa fa-clock-o"></span> Loading Supplier Info ...</div></div>
     }else{
        return (suppliers && suppliers.length) ? supplierPopulatedContent : (loadingSuppliers === false) ? supplierEmptyContent : null;
     }
     
     

  }
}

function mapStateToProps(state) {
    const { user } = state.auth;

    const { suppliers, loadingSuppliers } = state.suppliers;
    return { suppliers, loadingSuppliers, user };


}

export default connect(mapStateToProps, { getSuppliers })(SupplierLanding);