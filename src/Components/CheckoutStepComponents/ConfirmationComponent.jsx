import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import './ConfirmationComponent.css'


const ConfirmationComponent = () => (
  <div className="stepComponent confirmationComponent">
    <div className="componentTitle">Confirmation</div>
    <div className="itemSeparator"></div>
    <div className="confirmation">
      <FontAwesomeIcon icon={faCircleCheck} />
      <div className="componentTitle">Congratulations.<br/>Your order is accepted.</div>
      <div className="lightFont">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
      <button className="darkButton">TRACK ORDER</button>
      <button className="defaultButton">BACK TO HOME PAGE</button>
    </div>
  </div>
)

export default ConfirmationComponent;