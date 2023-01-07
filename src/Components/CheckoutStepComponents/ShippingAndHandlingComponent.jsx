import React from "react";
import ShippingInfoForm from "./ShippingInfoForm";
import ShippingMethodForm from "./ShippingMethodForm";
import { nameValidation, postcodeValidation, phoneNumberValidation } from "../LoginStepComponents/Validations";

class ShippingAndHandlingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingInfoFields: {
        addressTitle: '',
        nameSurname: '',
        yourAddress: '',
        zipCode: '',
        country: '',
        city: '',
        state: '',
        cellphone: '',
        telephone: '',
      },

      shippingMethod: '',

      error: {},
    }
  }

  handleShippingInfoSubmit = (e) => {
    e.preventDefault();

    const {
      addressTitle,
      nameSurname,
      yourAddress,
      zipCode,
      country,
      city,
      state,
      cellphone,
      telephone
    } = this.state.shippingInfoFields;

    let allClear = true;
    Object.keys(this.state.shippingInfoFields).map((key) => {
      let errorText;
      switch (key) {
        case 'addressTitle':
          if (addressTitle.length <= 0) {
            errorText = 'Please enter an address title'
          } else {
            errorText = ''
          }
          this.setState((prevState) => ({
            error: {...prevState.error, addressTitleError: errorText}
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;

        case 'yourAddress':
          if (yourAddress.length <= 0) {
            errorText = 'Please enter an address'
          } else {
            errorText = ''
          }
          this.setState((prevState) => ({
            error: {...prevState.error, addressError: errorText}
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;

        case 'nameSurname':
          if (nameSurname.length <= 0) {
            errorText = 'Please enter a name'
          } else{
            errorText = nameValidation(nameSurname);
          }
          this.setState((prevState) => ({
            error: {...prevState.error, nameError: errorText}
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;
        
        case 'zipCode':
          if (zipCode.length <= 0) {
            errorText = 'Please enter a zip code'
          } else {
            errorText = postcodeValidation(zipCode)
          }
          this.setState((prevState) => ({
            error: {...prevState.error, zipCodeError: errorText}
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;

        case 'country':
          if (country === 'select' || country === '') {
            errorText = 'Please select a country'
          } else {
            errorText = ''
          }
          this.setState((prevState) => ({
            error: {...prevState.error, countryError: errorText}
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;

        case 'city':
          if (city === 'select' || city === '') {
            errorText = 'Please select a city'
          } else {
            errorText = ''
          }
          this.setState((prevState) => ({
            error: {...prevState.error, cityError: errorText}
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;
        
        case 'state':
          if (state === 'select' || state === '') {
            errorText = 'Please select a state'
          } else {
            errorText = '';
          }
          this.setState((prevState) => ({
            error: {...prevState.error, stateError: errorText}
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;

        case 'cellphone':
          if (cellphone.length <= 0) {
            errorText = 'Please enter a number'
          } else {
            errorText = phoneNumberValidation(cellphone)
          }
          this.setState((prevState) => ({
            error: {...prevState.error, cellphoneError: errorText}
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;

        case 'telephone':
          if (telephone.length <= 0) {
            errorText = 'Please enter a number'
          } else {
            errorText = phoneNumberValidation(telephone);
          }
          this.setState((prevState) => ({
            error: {...prevState.error, telephoneError: errorText}
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
      let shipmentInfo = {
        info: {
          name: nameSurname,
          address: yourAddress,
          zipCode: zipCode,
          country: country,
        },
        method: this.state.shippingMethod,
      }
      this.props.handleUpdateShipmentInfo(shipmentInfo.info, shipmentInfo.method);
      this.props.handleNextStep();
    }
  }

  handleUpdateShippingInfoFields = (shippingInfo) => {
    this.setState((prevState) => ({
      shippingInfoFields: {...prevState.shippingInfoFields, ...shippingInfo}
    }))
  }

  handleUpdateShippingMethod = (method) => {
    this.setState({
      shippingMethod: method,
    })
    let amount = this.props.cartSubtotal;
    switch (method) {
      case 'standardShipping':
        if (amount < 400) {
          this.props.handleShippingMethodChange({shippingAndHandling: 10})
        } else {
          this.props.handleShippingMethodChange({shippingAndHandling: 0})
        }
        break;
      case 'expressShipping':
        this.props.handleShippingMethodChange({shippingAndHandling: 25})
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <form className="stepComponent shippingAndHandlingComponent" onSubmit={this.handleShippingInfoSubmit} id="shippingAndHandlingComponent">
        <div className="componentTitle">SHIPPING INFORMATION</div>
        <ShippingInfoForm handleUpdateShippingInfoFields={this.handleUpdateShippingInfoFields} error={this.state.error}/>
        <ShippingMethodForm handleUpdateShippingMethod={this.handleUpdateShippingMethod}/>
      </form>
    )
  }
}

export default ShippingAndHandlingComponent;