import React from "react";
import PropTypes from "prop-types";
import { ControlLabel, FormControl} from "react-bootstrap";
import "./generic.css";
import { detect } from 'detect-browser';

const NumberBox = ({displayText, invalid, onChange, name}) => {
    
    //For the cheeky user who wants to paste in BS numbers.
    const processPaste = (e, target) => {
        
            e.preventDefault();
            var text;
            const browser = detect();
    
            switch(browser && browser.name){
                case 'ie':
                case 'edge': {
                    text = window.clipboardData.getData('Text')
                } break;
                default: {
                    text = e.clipboardData.getData('text/plain') 
                }       
            }

            if (text && text !== "") {
                text = text.replace(/[^\d]*/g, "");
                e.target.value = text;
            }
            e.persist();
            onChange(e, e.target);
            
        }

    //Filter keys that number inputs won't
    const isDisallowed = (c) => {
        switch(c) 
        {
            case '-':
            case '+':
            case '.':
            return true;
            default: {
               // console.log('allowing ', c);
                return false;
            } 
        }
    }
    //Most keys that aren't language keys are allowed.  The number input specification from DHTML will take care of most of the
    //characters, but there are some stragglers like +, -, . that are allowed in a number field, we just need to filter those
    // and let anything else that a number box would normally (like DEL, RETURN, TAB etc.)
    const numberOnly = (e, target) => {
        e.persist();

        if(isDisallowed(e.key)){
            e.preventDefault();
            return false;
        } 
        return true;
        
    }
 
    return (
        <div className="col-md-6" style={{ padding: "0" }}>
              <ControlLabel>{displayText} {invalid ? <span className="required">(required)</span> : null } </ControlLabel>
                <FormControl
                type="number"
                name = {name}
                placeholder={"Enter "+displayText}
                ref={(input) => { this.input = input; }}
                onKeyDown={(e, target) => { numberOnly(e, target) }}
                onPaste={(e, target) => { processPaste(e, target) }}
                onChange={onChange}
                />
        </div>
          );
}
  
NumberBox.propTypes = {
    displayText: PropTypes.string,
    invalid: PropTypes.bool,
    onChange: PropTypes.func,
    name: PropTypes.string

    
  };
export default NumberBox;
