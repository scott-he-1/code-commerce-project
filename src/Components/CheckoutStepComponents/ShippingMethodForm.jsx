import React from "react";
import './ShippingMethodForm.css'

class ShippingMethodForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingMethod: '',
    }
  }

  handleShippingMethodInput = (e) => {
    let method = e.target.value;
    this.setState({
      shippingMethod: e.target.value,
    })
    this.props.handleUpdateShippingMethod(method);
  }

  render() {
    const shippingMethods = [
      {label: 'STANDARD', name: 'standardShipping', description: 'Delivery in 4-6 Business Days - Free ($400 min.)'},
      {label: 'EXPRESS', name: 'expressShipping', description: 'Delivery in 1-3 Business Days - $25' },
    ]
    return (
      <div>
        <div className="itemSeparator"></div>
        <div className="componentTitle">SHIPPING METHOD</div>
        <div className="shippingMethods">
        {shippingMethods.map((item) => (
          <div className="shippingMethodItem" key={item.name}>
            <input type="radio" name='shippingMethod' value={item.name} onChange={this.handleShippingMethodInput} required={true}/>
            <div className="shippingMethodLabel">{item.label}</div>
            <div className="shippingMethodDescription">{item.description}</div>
          </div>
        ))}
        </div>
      </div>
    )
  }
}

export default ShippingMethodForm;