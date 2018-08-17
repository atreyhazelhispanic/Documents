import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from 'react-bootstrap';

import { getReport } from '../../actions/suppliers';

import _ from 'lodash';

//TODO: This component needs to be factored out into smaller, easier-to-manage
//      Components.
class SupplierReport extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.addVpn = this.addVpn.bind(this);
    this.rmVpn = this.rmVpn.bind(this);
    this.generateReport = this.generateReport.bind(this);

    this.state = { open: false, selectedRegions: [], selectedVpns: [], loading: false, valid: true };
  }
  state = {
            open: false,
            loading: false,
            valid: true,
            selectedRegions: []
};

  componentWillMount(){
    //Removed demo/test vpns
    //this.state.selectedVpns.push("AW3978");
    //this.state.selectedVpns.push("AW4323");
    if(_.includes(this.props.report.parameters, "vpn" )){
      this.setState({ 'valid' : this.state.selectedVpns.length > 0 });
    }
    if(_.includes(this.props.report.parameters, "regions")){
      this.setState({ 'valid' : this.state.selectedRegions.length > 0  });
    }

  }
  generateReport(e, fileType){
    const q = _.clone(this.props.query);
    const supplierId = this.props.supplierId;

    if(!_.includes(['pdf', 'csv'], fileType)){
      throw(new Error('invalid report type sent to generateReport'));
    }
    if(_.includes(this.props.report.parameters, "vpn")){
      q.vpns = this.state.selectedVpns;
    }

    if(_.includes(this.props.report.parameters, "regions")){
      q.regions = this.state.selectedRegions;
    }
    q.fileType = fileType;
    
    this.props.getReport(q, supplierId, this.props.departmentNumber, this.props.report);
  }
  onRegionClick(e){

    var options = e.target.options || e.target.parentElement.options || [];
    console.log(e.target, 'target');
    var selectedOptions = [];

    for(var i=0;i<options.length;i++){
      var o = options[i];
    //  console.log('o => ', o);
      
      if(o.selected) {
      //  console.log('o is selected', o.value);
        selectedOptions.push(o.value);
      }
    }

    const { selectedRegions } = this.state;
    const _this = this;
    setTimeout(function(){
      _this.setState({
        selectedRegions: selectedOptions
    });
    _this.setState({ 'valid' : _this.state.selectedRegions.length > 0 });

    console.log('selectedRegions', _this.state.selectedRegions);


    }, 0);


  }


  addVpn(e) {
    var vpns = this.state.selectedVpns;
    if(!this.vpnBox.value) return;
    vpns.push(this.vpnBox.value);
    vpns = _.uniq(vpns).sort();
    this.setState({ 'selectedVpns' : vpns, 'valid': true });
    this.vpnBox.value = '';
    this.vpnBox.focus();
    //console.log('selectedVpns', this.state.selectedVpns);
  }
  rmVpn(e, i) {
    var vpns = this.state.selectedVpns;
    vpns = _.without(vpns, vpns[i]);

    this.setState({ 'selectedVpns' : vpns, 'valid': vpns.length > 0 });
    this.vpnBox.focus();
  }
  toggle(){
      this.setState({ open : !this.state.open });
  }

  render() {
    var loading = false;
    var errMessage = null;
    const hasXOverflow = _.some(this.state.selectedVpns, (vpn) => {  return (vpn.length > 10) }) ? "widevpn" : "";

    if(this.props.reportLoadingStatus)
        loading = this.props.reportLoadingStatus[this.props.report.urlFragment] === true;
    var hasError = false;
    if(this.props.reportLoadingStatus){
      hasError = !!this.props.reportLoadingStatus[this.props.report.urlFragment] && this.props.reportLoadingStatus[this.props.report.urlFragment] !== true ;

      const status = this.props.reportLoadingStatus[this.props.report.urlFragment];

      switch(status) {
          case "Document contained no data": {
            errMessage = <div style={{ marginTop: 10 }} className="alert alert-warning"><i className="fa fa-warning"></i> Report contains no data, so no file was generated.</div>
          } break;
          default:{
            errMessage = <div style={{ marginTop: 10 }} className="alert alert-danger"><i className="fa fa-bomb"></i>  Unable to generate report</div>
          } break;
      }
      
    }
        
            

    const showRegions = _.includes(this.props.report.parameters, "regions");
    const showVpn = _.includes(this.props.report.parameters, "vpn" );

    const regions = (<div>
      <div><label className="regionlabel">Select Region(s)</label></div>
      <select className="regionselect" onClick={this.onRegionClick.bind(this)}  multiple>
        {this.props.regions.map((r,i) => {
            return (<option key={i}  value={r.id}>{r.name} ({r.id})</option>)
        })}
      </select>
    </div>);
    const vpns = (<div style={{ clear: "both" }}>
      <label className="vpnlabel">Enter VPN:</label>
      <input type="text" ref={(input) => this.vpnBox = input } className="vpnbox" />
      <i className="fa fa-plus vpnplus" style={{ marginLeft: 10 }} onClick={this.addVpn} />
      <ul className={ "right vpnlist "+hasXOverflow }>
          {this.state.selectedVpns.map((v, i) => {
             return(<li key={i}><i className="fa fa-trash" onClick={(e) => this.rmVpn(e, i)}  />{v}</li>);
          })}
      </ul>
    
    </div>);
    const working = (<Button bsStyle="danger" disabled={true} onClick={function(){}}>
                  <i className="fa fa-circle-o-notch fa-spin" /> Working ...
                </Button>)

    const ready =  (
        <div className="row buttonbox">

            <div className="col-md-6 buttoncell" style={{  }}>
                <Button className="generateBtn" onClick={(e) => { this.generateReport(e, 'pdf') }} disabled={!this.state.valid} bsStyle="primary">
                    <i className="fa fa-file-pdf-o"></i> Generate PDF Report
                </Button>
            </div>
            <div className="col-md-6 buttoncell" style={{  }}>
                <Button className="generateBtn" onClick={(e) => { this.generateReport(e, 'csv') }} disabled={!this.state.valid} bsStyle="primary">
                    <i className="fa fa-file-o"></i> Generate CSV Report
                </Button>
            </div>
        </div>
                 )

    const expanded = (<div>
        <div className="reportexpanded"><p className="title">{this.props.report.name}</p></div>
        <div style={{marginLeft: "2em"}}>
            <div>{ showRegions ? regions : null }{showVpn ? vpns : null}</div>
            <div className="right">
               { loading ? working  : ready } 
               { hasError ? errMessage : null }
            </div>
        </div>
    </div>);
    const compressed = <span>{this.props.report.name}</span>
    return (
           <li > {this.state.open ? <i className="fa fa-minus plusicon" onClick={this.toggle} /> : <i className="fa fa-plus plusicon" onClick={this.toggle} /> }{this.state.open ? expanded : compressed }</li> 
    );
  }
}

function mapStateToProps(state) {
  if(state.suppliers){
      const { query, reportLoadingStatus } = state.suppliers
      return { query, reportLoadingStatus  };
  }
  return {}
}

export default connect(mapStateToProps, { getReport })(SupplierReport);
