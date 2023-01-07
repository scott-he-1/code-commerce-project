import React from "react";
import './PromoCode.css';

const INIT_PROMOCODE = '';
const INIT_ERROR = {};

class PromoCode extends React.Component {
  constructor() {
    super();
    this.state = {
      promoCode: INIT_PROMOCODE,
      
      error: INIT_ERROR,
    }
  }

  handlePromoCodeInput = (e) => {
    this.setState({
      promoCode: e.target.value,
    })
  }

  handlePromoCodeSubmit = (e) => {
    e.preventDefault();

    if (this.state.promoCode === 'DEVSLOPES') {
      this.setState({
        error: INIT_ERROR,
      })
      this.props.handlePromoCode(-20);
    } else {
      this.setState({
        error: {promoCodeError: 'The promo code is DEVSLOPES'}
      })
    }
  }

  render() {
    return (
      <div className="promoCodeSection">
        <div className="itemSeparator"></div>
        <div>
          <div>Do you have a promo code?</div>
          <form className="applyPromoCode" onSubmit={this.handlePromoCodeSubmit} >
            <input type="text" className="promoCode" onChange={this.handlePromoCodeInput} />
            <button className="codeApply">APPLY</button>
          </form>
          {this.state.error['promoCodeError'] && 
          <div>{this.state.error['promoCodeError']}</div>}
        </div>
      </div>
    )
  }
}

export default PromoCode;