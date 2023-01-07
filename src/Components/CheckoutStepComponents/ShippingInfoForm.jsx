import React from "react";
import './ShippingInfoForm.css'
import ShippingInputBase from "./ShippingInputBase";

class ShippingInfoForm extends React.Component {
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

    }
  }

  handleShippingInputs = (e) => {
    this.setState((prevState) => ({
      shippingInfoFields: {...prevState.shippingInfoFields, [`${e.target.name}`]: e.target.value}
    }));
    
    this.props.handleUpdateShippingInfoFields({[`${e.target.name}`]: e.target.value});
  }

  render() {
    const countries = [
      {label: 'Select', value: 'select',},
      {label: 'United States', value: 'unitedStates',},
      {label: 'Canada', value: 'canada',},
      {label: 'United Kingdom', value: 'unitedKingdom',},
      {label: 'Mexico', value: 'mexico',},
    ];
    
    const cities = [
      {label: 'Select', value: 'select',},
      {label: 'city1', value: 'city1',},
      {label: 'city2', value: 'city2',},
      {label: 'city3', value: 'city3',},
    ];
    
    const states = [
      {label: 'Select', value: 'select',},
      {label: 'state1', value: 'state1',},
      {label: 'state2', value: 'state2',},
      {label: 'state3', value: 'state3',},
      {label: 'state4', value: 'state4',},
      {label: 'state5', value: 'state5',},
    ];
    
    const shippingInputsFormFields = [
      {label: 'Address Title', name: 'addressTitle', type: 'text', error: 'addressTitleError'},
      {label: 'Name - Surname', name: 'nameSurname', type: 'text', error: 'nameError'},
      {label: 'Your Address', name: 'yourAddress', type: 'text', error: 'addressError'},
      {label: 'Zip Code', name: 'zipCode', type: 'text', error: 'zipCodeError'},
      {label: 'Country', name: 'country', type: 'select', select: countries, error: 'countryError'},
      {label: 'State', name: 'state', type: 'select', select: states, error: 'stateError'},
      {label: 'City', name: 'city', type: 'select', select: cities, error: 'cityError'},
      {label: 'Cell Phone', name: 'cellphone', type: 'text', error: 'cellphoneError'},
      {label: 'Telephone', name: 'telephone', type: 'text', error: 'telephoneError'},
    ];

    return (
      <div className="shippingForm">
        <div className="itemSeparator"></div>
        <div className="shippingFormFields">
        {shippingInputsFormFields.map((item) => (
          <ShippingInputBase
          key={item.name}
          label={item.label}
          name={item.name}
          onChange={this.handleShippingInputs}
          type={item.type}
          select={item.select ? item.select : null}
          errorM={(this.props.error) 
            && (this.props.error[item.error]) 
            && (this.props.error[item.error].length > 1) 
            ? this.props.error[item.error] 
            : null}
          />
        ))}
        </div>
      </div>
    )
  }
}

export default ShippingInfoForm;