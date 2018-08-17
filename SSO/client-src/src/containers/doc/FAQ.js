/*
		<DIV id="content">

		</DIV>

 */

import React, { Component } from "react";
import { NavHashLink as Link } from 'react-router-hash-link';

class FAQ extends Component {
	render(){

		const backToTop = (
				<p><b><Link to="/faq/#_Nordstrom_Portal_FAQs">Back to top</Link></b></p>  
		);

		return   ( 
		 <div className="container">
		   <h2><a id="_Nordstrom_Portal_FAQs">Nordstrom Supplier Reports FAQs</a></h2>
		   <p>
		      <b>
		         <Link to="/faq/#_Pre_Register1">
		         How do I Register myself for the Supplier Reports</Link>
		      </b>
		   </p>
		   <p>
		      <b>
		         <Link to="/faq/#_To_Request_Access">
		         How to Request Access</Link>
		      </b>
		   </p>
		   <p>
		      <b>
		         <Link to="/faq/#_change_password">
		         How to change your password/email address</Link>
		      </b>
		   </p>
		   <p>
		      <b>
		         <Link to="/faq/#_Problems_Logging_On">
		         Problems Logging on</Link>
		      </b>
		   </p>
		   <p>
		      <b>
		         <Link to="/faq/#_Minimum_PC_requirements">
		         Minimum PC requirements</Link>
		      </b>
		   </p>
		   <p>&nbsp;</p>
		   <h3><a id="_Pre_Register1"></a>How do I Register myself for the Supplier Reports?</h3>
		   <p><b>Q How do I register myself for the Supplier Reports?</b>
		   </p>
		   <p><b>A </b>
		      Please contact Supplier Reports administrator within your company to get an access. 
		      Administrators can then login to the Supplier Reports so that they may add new users for his/her account.
		      If there are no administrators or if you are setting up the access for your supplier for the first time, then contact <a href="mailto:supplier.reports@nordstrom.com">
		      <b>supplier.reports@nordstrom.com</b></a> to request access to the sales and inventory reporting on the Supplier Reports website.
		      .&nbsp;
		   </p>
		   <p>
		   </p>
		   <p><b>Q Why do I&nbsp;register myself for the Supplier Reports?</b>
		   </p>
		   <p><b>A </b>
		      The Supplier Reports will ensure that each individual user of the portal has
		      a unique and valid email address to access the site.&nbsp;
		   </p>
		   <p>
		   </p>
		   <p><b>Q What do I&nbsp;need to register for the Supplier Reports?</b>
		   </p>
		   <p><strong>A </strong>
		      To register for the Supplier Reports portal, you will need provide your name, email address, Supplier/Vendor Name and Number.
		      &nbsp;
		   </p>
		   <p><strong>Q <a id="_Login"></a>Why should I provide my email address during
		      Login?</strong>
		   </p>
		   <strong>
		   </strong>
		   <p><strong>A</strong>
		      You are required to login with the email address that you used for
		      registration.
		   </p>
		   <p><strong>Q What will my email address be used for?</strong></p>
		   <p><strong>A</strong> At the most basic level your email address is required to
		      gain access to the new Supplier Reports. It is only used to contact you in
		      regards to your account management.
		   </p>
		   <p><strong>Q <a id="_dadmin"></a>Who is an Administrator and what purpose do they
		      serve in the Supplier Reports?</strong>
		   </p>
		   <strong>
		   </strong>
		   <p><strong>A</strong> Administrator is a feature of our Supplier
		      Supplier Reports. Here is some important information to note:
		   </p>
		   <div>
		      <ul>
		         <li>
		            Every Pay-to-Vendor/Supplier company must designate at least one individual
		            within the Supplier/Vendor company as an Administrator for their account with
		            Nordstrom.
		         </li>
		         <li>
		            There can be more than one administrator for an account. Best practice is to
		            keep a minimum of 2 administrators per Supplier/Vendor company.
		         </li>
		         <li>
		            Administrators can then login to the Supplier Reports so that they may add/remove users for his/her account.
		         </li>
		      </ul>
		   </div>
		   <p><strong>Q I am the administrator for our account. I need to setup accounts for other
		      people within my company. How do I add users to the account?</strong>
		   </p>
		   <strong>
		   </strong>
		   <p><strong>A </strong>Administrators are responsible for creating accounts for other
		      users. Aministrators can add new users by providing Partner Name, User First/Last Name, e-mail address and Supplier Group. 
		      There will be Admin and User supplier groups for each Supplier Number which control the Admin and User access.
		      Administrators can choose the access level for the new users by selecting the appropriate group. 
		      Administrators can also add/remove or promote/demote access to users using the User Management (Partner Access) UI. 
		      If user happens to be a part of both Admin and User group for the specific Supplier, then Admin priviledge takes the precidence.
		      &nbsp;
		   </p>
		   <p><strong>Q I have more questions. Who do I contact?</strong></p>
		   <strong>
		   </strong>
		   <p><strong>A </strong>Please use the following information to contact us with your
		      questions:
		   </p>
		   <ul>
		      <li>
		         For <b>Supplier Reports</b>,
		         contact <a href="mailto:supplier.reports@nordstrom.com">
		         <b>supplier.reports@nordstrom.com</b></a>&nbsp;
		      </li>
		   </ul>
		   {backToTop}
		   <h3><a id="_To_Request_Access"></a>To Request Access</h3>
		   <p><b>Q How do I get access to the Nordstrom Supplier Reports?</b>
		   </p>
		   <p><b>A </b>A Pay to Vendor as well as a Supplier must be set up prior to the
		      portal access. If you are an active Pay to Vendor or Supplier please contact:
		   </p>
		   <ul>
		      <li>
		         For permission to receive selling data through the Supplier Reports
		         contact: <a href="mailto:supplier.reports@nordstrom.com">
		         supplier.reports@nordstrom.com</a>.&nbsp;
		      </li>
		   </ul>
		   {backToTop}
		   <h3><a id="_change_password"></a>How do I change my password/email address</h3>
		   <p><b>Q I have registered into the portal but I would like to change my password.
		      How do I make the change?</b>
		   </p>
		   <b>
		   </b>
		   <p><b>A </b>
		      This functionality is limited to Administrators for the initial release. Supplier/Vendor Administrators can help you change your password. 
		      Adminstrators need to select the user and click on the email icon to generate the password change email. 
		      User will receive an email with the instrucitons on how to change the password.
		   </p>
		   <p><b>Q I would like to change my email address and keep my password, who should I
		      contact?</b>
		   </p>
		   <b>
		   </b>
		   <p><b>A </b>In the Supplier Reports, your email address is used as&nbsp;an
		      unique identifier to access your account. This information cannot be changed
		      once registered. However, you may choose to register with another email address of yours. This will be considered as a new account
		      registration.
		   </p>
		   {backToTop}
		   <h3><a id="_Problems_Logging_On">Problems Logging On</a></h3>
		   <p><b>Q I am having problems logging into the portal. Who should I contact?</b></p>
		   <b>
		   </b>
		   <p><strong>A </strong>If you have already registered with your email address on the
		      Supplier Reports portal, your Supplier/Vendor administrator can help you reset the password. If you continue to experience problems, please
		      send your inquiry to;
		   </p>
		   <ul>
		      <li>
		         For <b>Supplier Reports</b>
		         contact <b>
		         <a href="mailto:supplier.reports@nordstrom.com">
		         supplier.reports@nordstrom.com</a></b> with "Assistance Request" in the
		         subject field. Please include your Supplier Number, Supplier Name, Contact
		         person and Contact email address.
		      </li>
		   </ul>
		   {backToTop}
		   <h3><a id="_How_to_navigate_2"></a>How to Navigate in the Supplier Reports</h3>
		   <p><b>Q How do I find the information I need in the Nordstrom Supplier web site?</b></p>
		   <b>
		   </b>
		   <p><b>A </b>When you request access to the portal, training materials and
		      navigation instructions are provided to you. Please refer to these documents or
		      contact:
		   </p>
		   <ul>
		      <li>
		         For <b>Supplier Reports</b>
		         contact <a href="mailto:supplier.reports@nordstrom.com">
		         <b>supplier.reports@nordstrom.com</b></a> with "Assistance Request" in the
		         subject field. Please include your Supplier Number, Supplier Name, Contact
		         person, Contact phone number and Contact email address.
		      </li>
		   </ul>
		   {backToTop}
		   <h3><a id="_Minimum_PC_requirements"></a>Minimum PC Requirements</h3>
		   <b>Computer:</b>
		   <ul>
		      <li>Operating systems: Windows 7/8/10, Mac OSX Sierra or newer</li>
		      <li>Processor: 1 gigahertz (GHz) or faster</li>
		      <li>RAM: 1 gigabyte (GB) (32-bit) or 2 GB (64-bit) or higher</li>
		      <li>Hard disk space: 16 GB (32-bit) or 20 GB (64-bit) or higher</li>
		      <li>Internet access (ISP fees might apply)</li>
		   </ul>
		   <b>Browser:</b>
		   <ul>
		      <li>Internet Explorer 11</li>
		      <li>Firefox (current version)</li>
		      <li>Chrome (current version)</li>
		      <li>JavaScript enabled</li>
		      <li>Cookies enabled</li>
		   </ul>
		   <b>Other Software:</b>
		   <ul>
		      <li>Adobe Acrobat Reader - current version</li>
		   </ul>
		</div>
		);
	}
}

export default FAQ;