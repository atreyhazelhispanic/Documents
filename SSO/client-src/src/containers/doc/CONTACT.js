
import React, { Component } from "react";
import Supplier_Resources_and_Contacts from "./Supplier_Resources_and_Contacts.pdf";

const CONTACT = ({  }) => {
    return (
        <div className="container">
            <h2>Nordstrom Supplier Portal - Contact Us<a name="_Nordstrom_Supplier_Portal"></a> </h2>
            <p>For more detailed information regarding contacts for Non-Compliance offset
                fees, Claims, Invoice or Check status, please refer to the following documents:</p>
            <table cellSpacing="0" >
                <tbody>
                <tr>
                    <td align="middle"><b>
                        <a href={require("./Supplier_Resources_and_Contacts.pdf")} download="Supplier_Resources_and_Contacts.pdf">Supplier Resources and Contacts</a></b></td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                </tr></tbody></table>
                <br />
            <h3><a name="_Supplier's_Tool_Kit"></a>Supplier Reports</h3>
            <p>For questions concerning information on Supplier Reports, or to gain access
                to Supplier Reports, please contact your Nordstrom Buyer. If you have an
                existing account and need help accessing or navigating our Supplier Reports, please email <a href="mailto:supplier.reports@nordstrom.com">supplier.reports@nordstrom.com</a>.
                Please include Supplier Number, Supplier Name,
                Contact Name and Phone Number in your email.
            </p><h3><a name="_Supplier_Compliance"></a>Supplier Compliance</h3>
            <p>For Compliance questions, please email <a href="mailto:micompliance@nordstrom.com">micompliance@nordstrom.com</a> or call
                1-877-444-1313, option 2. For inquiries on Non-compliance offset fees, please
                email <a href="mailto:michargebacks@nordstrom.com">michargebacks@nordstrom.com</a>. Our compliance manual can be viewed or
                downloaded from our supplier website <a href="http://www.nordstromsupplier.com/" target="_blank">http://www.nordstromsupplier.com/</a> </p><p>Refer to <a href="/#/faq"><b>Portal FAQs</b></a> for answers to frequently asked questions.
        </p><p>
        </p>
        </div>
    );
}

export default CONTACT;