import React, {  Component } from "react";
import PropTypes from "prop-types";
import "./suppliers.css";
import { FormGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { setPartnerNumber, getSingleSupplier, clearSingleSupplier } from '../../actions/suppliers';

import NumberBox from '../generic/NumberBox';

class PartnerLookup extends Component {
    state = {
        supplierId : "",
        valid: false
    };
  constructor(props){
    super(props);

    this.updateParams = this.updateParams.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
        supplierId : "",
        valid: false
    };
  }
  componentWillMount(){
      //Reset state when the form loads.
      this.props.clearSingleSupplier();
  }

  componentWillReceiveProps(nextProps) {
      //Submit has been pressed, redux has populated the single supplier in global
      // state.
      if(nextProps.singleSupplier) {
          const { id } = nextProps.singleSupplier;
          this.props.history.push(`/reports/${id}`);
      }
  }
  submit(e) {
      const { supplierId } = this.state;
      const { user } = this.props;
       e.preventDefault();

      this.props.getSingleSupplier({ supplierId, user });

  }

  updateParams(e) {
    const { value } = e.target;

    this.setState({ supplierId: value });
    this.props.setPartnerNumber(value);
  }

  renderStatus(){

      const { singleComplete, singleSupplier, loadingSingle } = this.props;

      if(loadingSingle) {
        return <p className="alert alert-info">{`Looking up supplier ${this.state.supplierId}...`}</p>
      }

      if(singleComplete && !singleSupplier) {
          return <p className="alert alert-danger">Unknown Supplier ID</p>
      }
      return null;

  }
  render() {

 //const invalidMessage = (<div className="alert alert-info">Please enter a supplier id.</div>);
const invalidMessage = null;
const { supplierId } = this.state;
const { singleComplete, singleSupplier, loadingSingle } = this.props;

 return (
     <div className="" >
        <div className="row">
          <div className="col-md-8" >
              <legend>Supplier Lookup</legend>
               <form onSubmit={this.submit} className="mainReportForm">
                <FormGroup
                  controlId="mainReportForm"
                >

                  <NumberBox  
                              name="supplierId"
                               displayText="Supplier ID"
                             invalid={!supplierId}
                             onChange={this.updateParams.bind(this)} />

                </FormGroup>
                <div className="col-md-12" style={{ padding: "0"}}>
                   {this.renderStatus()}
                   <button className="btn btn-info" style={{ backgroundColor: "#000000"}} disabled={!this.state.supplierId}  onClick={this.submit}>Submit</button>
                </div>

              </form>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    const { singleSupplier, loadingSingle, singleComplete } = state.suppliers;

  return {
    user: state.auth.user,
    singleSupplier,
      loadingSingle,
    singleComplete
  };
}

export default connect(mapStateToProps, { setPartnerNumber, getSingleSupplier, clearSingleSupplier })(PartnerLookup);
