import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCartShopping, faTruck, faCreditCard, faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import './CheckoutProcess.css'
import css from '../../assets/images/css.jpg'
import html from '../../assets/images/html.png'
import PromoCode from "./PromoCode";
import CartItemsComponent from "./CartItem";
import ShippingAndHandlingComponent from "./ShippingAndHandlingComponent";
import PaymentComponent from "./PaymentComponent";
import ConfirmationComponent from "./ConfirmationComponent";
import { CARD, CARDICON } from './cardConstants';

const INIT_CARTITEMS = [
  {itemID: '612312', title: 'CSS To Spice Up Your Page', fileType: 'CSS', imageLocation: css , linesAmount: 259, for: 'All Types', price: 210, totalQuantity: 1, totalPrice: 210},
  {itemID: '123510', title: 'Base HTML For Start-ups', fileType: 'HTML', imageLocation: html , linesAmount: 409, for: 'Business', price: 599.5, totalQuantity: 1, totalPrice: 599.5},
]

class CheckoutProcess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: [
        {label: 'CART', name: 'cartItemComponent', stepNumber: 1, icon: faCartShopping, iconName: 'shoppingCart', current: true, stepFinished: false},
        {label: 'DELIVERY', name: 'shippingAndHandlingComponent', stepNumber: 2, icon: faTruck, iconName: 'truck', current: false, stepFinished: false},
        {label: 'PAYMENT', name: 'paymentComponent', stepNumber: 3, icon: faCreditCard, iconName: 'creditCard', current: false, stepFinished: false},
        {label: 'CONFIRMATION', name: 'confirmationComponent', stepNumber: 4, icon: faCircleCheck, iconName: 'circleCheck', current: false, stepFinished: false}
      ],

      cartItems: INIT_CARTITEMS,

      summaryPricingInfo: {
        cartSubtotal: INIT_CARTITEMS.length > 0 ? INIT_CARTITEMS.map((item) => item.price * item.totalQuantity).reduce((a, b) => a + b, 0): 0,
        shippingAndHandling: 0,
        discount: 0,
      },

      summaryShipmentInfo: {
        name: '',
        address: '',
        zipCode: '',
        country: '',
        email: localStorage.getItem('loggedInEmail'),
      },

      shipmentMethod: '',

      cardPaymentInfo: {
        cardholderName: '',
        cardNumber: '',
        expiryDate: {
          expiryMonth: '',
          expiryYear: '',
        },
        cvv: '',
      },

      cardType: ''

    }
  }

  handleCartItemChange = (items, newPrices) => {
    this.setState((prevState) => ({
      cartItems: [...items],
      summaryPricingInfo: {...prevState.summaryPricingInfo, ...newPrices}
    }))
  }

  handlePromoCode = (promoCodeAmount) => {
    this.setState((prevState) => ({
      summaryPricingInfo: {...prevState.summaryPricingInfo, discount: promoCodeAmount}
    }))
  }

  handleShippingMethodChange = (newPrices) => {
    this.setState((prevState) => ({
      summaryPricingInfo: {...prevState.summaryPricingInfo, ...newPrices}
    }))
  }

  handleUpdateShipmentInfo = (shipmentInfo, shipmentMethod) => {
    this.setState((prevState) => ({
      summaryShipmentInfo: {...prevState.summaryShipmentInfo, ...shipmentInfo},
      shipmentMethod: shipmentMethod
    }))
  }

  handleUpdateCardPaymentInfo = (cardInfo) => {
    this.setState((prevState) => ({
      cardPaymentInfo: {...prevState.cardPaymentInfo, ...cardInfo}
    }))
  }

  handleUpdateExpiryDateInfo = (expiryDate) => {
    this.setState((prevState) => ({
      cardPaymentInfo: {...prevState.cardPaymentInfo, expiryDate: {...prevState.cardPaymentInfo.expiryDate, ...expiryDate}}
    }))
  }

  handleUpdateCardType = (cardType) => {
    this.setState({
      cardType: cardType
    })
  }

  handleNextStepDisable = () => {
    const {cardholderName, cardNumber, cvv} = this.state.cardPaymentInfo;
    const {expiryMonth, expiryYear} = this.state.cardPaymentInfo.expiryDate;
    if (this.state.cartItems.length === 0) {
      return true
    } else if (this.state.progress.find((step) => step.name === 'paymentComponent').current === true) {
      if (cardholderName.length === 0 || cardNumber.length === 0 || cvv.length === 0 || expiryMonth === 'select' || expiryYear === 'select') {
        return true
      }
    } else {
      return false;
    }
  }

  handleNextStep = () => {
    let currentStep = document.querySelector('.stepComponent.active');
    let nextStep = currentStep.nextSibling;
    currentStep.classList.remove('active');
    nextStep.classList.add('active');

    this.setState({
      progress: this.state.progress.map((step) => {
        if (step.name === currentStep.classList[1]) {
          return {...step, current: false, stepFinished: true};
        } else if (step.name === nextStep.classList[1]) {
          return {...step, current: true};
        } else {
          return step;
        }
      })
    })
  }

  handlePreviousStep = () => {
    let currentStep = document.querySelector('.stepComponent.active');
    let prevStep = currentStep.previousSibling;
    currentStep.classList.remove('active')
    prevStep.classList.add('active');

    this.setState({
      progress: this.state.progress.map((step) => {
        if (step.name === currentStep.classList[1]) {
          return {...step, current: false};
        } else if (step.name === prevStep.classList[1]) {
          return {...step, current: true, stepFinished: false};
        } else {
          return step;
        }
      })
    })
  }

  render() {
    const {cartSubtotal, shippingAndHandling, discount} = this.state.summaryPricingInfo;

    return (
      <div className="container checkoutProcess">
        <div className="progressSection">
          <div className="progressBar">
            {this.state.progress.map((item) => (
              <div className="stepSegment" key={item.name}>
                {item.stepNumber === 1 ? null : <div className={item.current ? "leftWing active" : item.stepFinished ? "leftWing active" : "leftWing"}></div>}
                <div className="circleSegment">
                  <div className={item.current ? "circle active" : item.stepFinished ? "circle active" : "circle"}>
                    {item.stepFinished ?  <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={item.icon} id={item.iconName} />}
                  </div>
                  <div className="progressText">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={this.state.progress.find((step) => step.current === true).name === 'confirmationComponent' ? "checkoutMainDisplay final" : "checkoutMainDisplay"}>
          <div className="stepComponentsSection">
            <CartItemsComponent 
            cartItems={this.state.cartItems} 
            handleCartItemChange={this.handleCartItemChange} 
            handleNextStep={this.handleNextStep}/>
            <ShippingAndHandlingComponent 
            cartSubtotal={cartSubtotal} 
            handleShippingMethodChange={this.handleShippingMethodChange} 
            handleUpdateShipmentInfo={this.handleUpdateShipmentInfo} 
            handleNextStep={this.handleNextStep}/>
            <PaymentComponent 
            handleUpdateCardPaymentInfo={this.handleUpdateCardPaymentInfo} 
            handleUpdateExpiryDateInfo={this.handleUpdateExpiryDateInfo} 
            handleNextStep={this.handleNextStep}
            handleUpdateCardType={this.handleUpdateCardType}/>
            <ConfirmationComponent 
            cardType={this.state.cardType}/>
            {(this.state.progress[0].stepFinished === true) && 
            (this.state.progress[2].stepFinished === false) &&
            <button 
            className="backButton" 
            onClick={this.handlePreviousStep}>
              BACK TO {this.state.progress
              .find((item) => item.stepNumber === (this.state.progress
              .find((item) => item.current).stepNumber - 1)).label}
              </button>}
          </div>

          <div className="summarySection">
            <div>SUMMARY</div>
            {(this.state.progress.find((item) => item.name === 'cartItemComponent').stepFinished === false) && 
            <PromoCode handlePromoCode={this.handlePromoCode}/>}

            {(this.state.progress.find((item) => item.name === 'cartItemComponent').stepFinished === true) && 
            (this.state.progress.find((item) => item.name === 'paymentComponent').stepFinished === false) &&
            <div>
              <div className="itemSeparator"></div>
              <div>{`${this.state.cartItems.length} ${this.state.cartItems.length === 1 ? 'item' : 'items'} in your bag.`}</div>       
            </div>}

            {(this.state.progress.find((item) => item.name === 'cartItemComponent').stepFinished === true) &&
            <div className="summaryFinalizedItems">
              <div className="itemSeparator"></div>
              {this.state.cartItems.map((item) => (
                <div className="summaryCartItem" key={`CI${item.itemID}`}>
                  <img src={item.imageLocation} alt="code" />
                  <div className="summaryItemInfo">
                    <div className="summaryItemTitling">
                      <div>{item.title}</div>
                      <div><span>File Type: </span><span>{item.fileType}</span></div>
                    </div>
                    <div className="summaryItemPricing">
                      <div><span>Size: </span><span>{item.linesAmount}</span></div>
                      <div><span>Qty: </span><span>{item.totalQuantity}</span><span className="summaryItemTotal">${(item.totalQuantity * item.price).toFixed(2)}</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>}

            <div className="pricingSection">
              <div className="itemSeparator"></div>
                <div className="summaryPricingInfo">
                  <div><span>Cart Subtotal:</span><span className="rightSpan">{cartSubtotal !== 0 ? `$${Number(cartSubtotal).toFixed(2)}` : '-'}</span></div>
                  <div><span>Shipping & Handling:</span><span className="rightSpan">{shippingAndHandling !== 0 ? `$${shippingAndHandling}` : '-' }</span></div>
                  <div><span>Discount:</span><span className="rightSpan">{discount !== 0 ? `$${discount}` : '-'}</span></div>
                  <div><span>Cart Total:</span><span className="rightSpan">{(cartSubtotal + shippingAndHandling + discount) !== 0 ? `$${Number(cartSubtotal + shippingAndHandling + discount).toFixed(2)}` : '-'}</span></div>
                </div>
            </div>

            {(this.state.progress.find((item) => item.name === 'shippingAndHandlingComponent').stepFinished === true) &&
            (this.state.progress.find((item) => item.name === 'paymentComponent').stepFinished === false) &&
            <div>
              <div className="itemSeparator"></div>
              <div className="summaryHeader">SHIPMENT ADDRESS</div>
              <div className="summaryShippingInfo">
                <div>{this.state.summaryShipmentInfo.name}</div>
                <div>{this.state.summaryShipmentInfo.address}</div>
                <div><span>{this.state.summaryShipmentInfo.zipCode}</span> <span>{this.state.summaryShipmentInfo.country}</span></div>
                <div>Email: {this.state.summaryShipmentInfo.email}</div>
              </div>
            </div>}

            {(this.state.progress.find((item) => item.name === 'shippingAndHandlingComponent').stepFinished === true) &&
            <div>
              <div className="itemSeparator"></div>
              <div className="summaryHeader">SHIPMENT METHOD</div>
              <div className="summaryShippingInfo">
                <div>{this.state.shipmentMethod === 'standardShipping' ? 'Standard Shipping': this.state.shipmentMethod === 'expressShipping' ? 'Express Shipping' : ''}</div>
                <div>{this.state.shipmentMethod === 'standardShipping' ? 'Delivery in 4-6 working days': this.state.shipmentMethod === 'expressShipping' ? 'Delivery in 1-3 business days' : ''}</div>
              </div>
            </div>}

            {(this.state.progress.find((item) => item.name === 'paymentComponent').stepFinished === true) &&
            <div>
              <div className="itemSeparator"></div>
              <div>PAYMENT</div>
              <div className="paymentSummary">
                <div className="cardLogo">
                {this.state.cardType.length && (
                  <img src={CARDICON[this.state.cardType]} alt="card" className="cardLogo"/>
                )}
                </div>
                {this.state.cardType.length && (
                  <div>{this.state.cardType}</div>
                )}
                {this.state.cardPaymentInfo.cardNumber.match(/\d{4}$/g) && 
                <div>{this.state.cardPaymentInfo.cardNumber.match(/\d{4}$/g)}</div>}
                <div>{`Total Payment: $${(cartSubtotal + shippingAndHandling + discount).toFixed(2)}`}</div>
              </div>
            </div>}

          </div>
        </div>

        {(this.state.progress.find((step) => step.current === true).stepNumber < this.state.progress.length) &&
        <div className="nextStepButton">
          <button 
          className="nextStepButton"
          disabled={this.handleNextStepDisable()} 
          form={this.state.progress.find((step) => step.current === true).name}>
          {this.state.progress.find((step) => step.current === true).name === 'cartItemComponent' ? 'Checkout' : null}
          {this.state.progress.find((step) => step.current === true).name === 'shippingAndHandlingComponent' ? 'Next' : null}
          {this.state.progress.find((step) => step.current === true).name === 'paymentComponent' ? `Pay $${(cartSubtotal + shippingAndHandling + discount).toFixed(2)}` : null}
          </button>
        </div>}
      </div>
    )
  }
}

export default CheckoutProcess;