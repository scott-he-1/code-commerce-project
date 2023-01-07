import React from "react";
import { nameValidation } from "../LoginStepComponents/Validations";
import { cardExpireValidation, cardNumberValidation, cvvValidation } from "./cardValidations";
import './PaymentComponent.css'
import PaymentInputBase from "./PaymentInputBase";

class PaymentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardData: {
        cardholderName: '',
        cardNumber: '',
        expiryDate: {
          expiryMonth: '',
          expiryYear: '',
        },
        cvv: '',
      },

      cardType: '',

      error: {}
    }
  }

  findCardType = (cardNumber) => {
    const regexPattern = {
      MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
      VISA: /^4[0-9]{2,}$/,
      AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    };
    for (const card in regexPattern) {
      if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) return card;
    }
    return '';
  }

  handleCardInputData = (e) => {
    if (e.target.name === 'expiryMonth' || e.target.name === 'expiryYear') {
      this.setState((prevState) => ({
        cardData: {...prevState.cardData, expiryDate: {...prevState.cardData.expiryDate, [`${e.target.name}`]: e.target.value}}
      }))
      let object = {
        [`${e.target.name}`]: e.target.value
      }
      this.props.handleUpdateExpiryDateInfo(object)
    } else if (e.target.name === 'cardNumber') {
      let mask = e.target.value.split(' ').join('');
      if (mask.length) {
        mask = mask.match(new RegExp('[0-9]{1,4}', 'g')).join(' ');
      }
      this.setState((prevState) => ({
        cardData: {...prevState.cardData, [`${e.target.name}`]: mask},
        cardType: this.findCardType(mask)
      }))
      let object = {
        [`${e.target.name}`]: mask
      }
      this.props.handleUpdateCardType(this.findCardType(mask))
      this.props.handleUpdateCardPaymentInfo(object)
    } else if (e.target.name === 'cvv') {
      let mask = e.target.value.split(' ').join('');
      if (mask.length) {
        mask = mask.match(new RegExp('[0-9]{1,3}', 'g')).join(' ');
      }
      this.setState((prevState) => ({
        cardData: {...prevState.cardData, [`${e.target.name}`]: mask}
      }))
      let object = {
        [`${e.target.name}`]: mask
      }
      this.props.handleUpdateCardPaymentInfo(object)
    } else {
      this.setState((prevState) => ({
        cardData: {...prevState.cardData, [`${e.target.name}`]: e.target.value}
      }))
      let object = {
        [`${e.target.name}`]: e.target.value
      }
      this.props.handleUpdateCardPaymentInfo(object)
    }
  }

  handlePaymentInfoSubmit = (e) => {
    e.preventDefault();
    const {
      cardholderName,
      cardNumber,
      expiryDate,
      cvv,
    } = this.state.cardData;

    let allClear = true;
    Object.keys(this.state.cardData).map((key) => {
      let errorText;
      switch (key) {
        case 'cardholderName':
          errorText = nameValidation(cardholderName);
          this.setState((prevState) => ({
            error: {...prevState.error, cardholderNameError: errorText}
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;
        case 'cardNumber':
          errorText = cardNumberValidation(cardNumber);
          this.setState((prevState) => ({
            error: {...prevState.error, cardNumberError: errorText}
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;
        case 'expiryDate':
          errorText = cardExpireValidation(expiryDate.expiryMonth, expiryDate.expiryYear);
          this.setState((prevState) => ({
            error: {...prevState.error, expiryDateError: errorText}
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;
        case 'cvv':
          errorText = cvvValidation(cvv)
          this.setState((prevState) => ({
            error: {...prevState.error, cvvError: errorText}
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;
      
        default:
          break;
      }
    })
    if (allClear) {
      this.setState({
        cardType: this.findCardType(this.state.cardData.cardNumber)
      })
      this.props.handleNextStep()
    }

  }

    render() {
      const cardDataFields = [
        {label: 'Cardholder Name', name: 'cardholderName', type: 'text', error: 'cardholderNameError'},
        {label: 'Card Number', name: 'cardNumber', type: 'text', maxLength: 19, error: 'cardNumberError'},
        {label: 'Exp. Date', name: 'expiryDate', type: 'select', error: 'expiryDateError'},
        {label: 'CVV', name: 'cvv', type: 'text', maxLength: 3, error: 'cvvError'},
      ]
  
      const expiryDateMonths = [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
      ]
  
      const expiryDateYears = []
      for (let i = 0; i < 10; i++) {
        expiryDateYears.push(`${new Date().getFullYear() + i}`)
      }
  
      return (
      <form className="stepComponent paymentComponent" id="paymentComponent" onSubmit={this.handlePaymentInfoSubmit}>
        <div className="componentTitle">PAYMENT INFORMATION</div>
        <div className="itemSeparator"></div>
        <div className="cardDataFields">
        {cardDataFields.map((item) => (
          <PaymentInputBase
          label={item.label}
          name={item.name}
          type={item.type}
          value={this.state.cardData && this.state.cardData[item.name]}
          onChange={this.handleCardInputData}
          expiryDateMonths={expiryDateMonths}
          expiryDateYears={expiryDateYears}
          key={`p${item.name}`}
          maxLength={item.maxLength ? item.maxLength : null}
          cardType={this.state.cardType}
          error={this.state.error}
          errorM={
            (this.state.error)
            && (this.state.error[item.error])
            && (this.state.error[item.error].length > 1)
            ? this.state.error[item.error]
            : null
          }
          />
        ))}
        </div>
      </form>
    )
  }
}


export default PaymentComponent;