import React from "react";
import './PaymentInputBase.css'
import { CARD, CARDICON } from './cardConstants'

const PaymentInputBase = ({label, name, type, expiryDateMonths, expiryDateYears, onChange, value, maxLength, error, errorM, cardType}) => (
  <div className="paymentInputBase" key={`ip${name}`}>
    {(type === 'text') &&
    <div className="paymentField">
      <div className="paymentInputLabel">{label}</div>
      <input type={type} name={name} onChange={onChange} value={value} maxLength={maxLength} id={name}/>
      {(!error || !error.cardNumberError) && CARD.includes(cardType) && name === 'cardNumber' && (
        <img src={CARDICON[cardType]} alt="card" className="cardLogo"/>
      )}
    </div>}
    {(name === 'expiryDate') &&
    <div className="paymentField">
      <div className="paymentInputLabel">{label}</div>
      <div className="expiryDateInputs">
        <select name="expiryMonth" id="expiryMonth" onChange={onChange}>
          <option value="select">Select</option>
          {expiryDateMonths.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
        <select name="expiryYear" id="expiryYear" onChange={onChange}>
          <option value="select">Select</option>
          {expiryDateYears.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>}
    {errorM && <div className="paymentError">{errorM}</div>}
  </div>
)

export default PaymentInputBase;