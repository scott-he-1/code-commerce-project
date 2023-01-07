import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faTriangleExclamation, faX } from "@fortawesome/free-solid-svg-icons";
import './CartItem.css';

const INIT_NOTIFICATIONS = {
  deletedAmount: 0,
  itemInfo: [],
}

class CartItemsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: this.props.cartItems,

      notifications: INIT_NOTIFICATIONS,
    }
  }

  handleQuantityChange = (e) => {
    let item = this.state.cartItems.find((item) => item.itemID === e.target.getAttribute('itemID'))
    item.totalQuantity = e.target.value;
    item.totalPrice = item.price * item.totalQuantity;

    let items = this.state.cartItems;
    let newPrices = {
      cartSubtotal: this.state.cartItems.map((item) => item.totalPrice).reduce((a, b) => a + b, 0),
    }
    this.props.handleCartItemChange(items, newPrices);
  }
  
  handleDeleteItem = (e) => {
    let item = this.state.cartItems.find((item) => item.itemID === e.target.parentElement.parentElement.getAttribute('itemID'));
    
    this.setState((prevState) => ({
      notifications: {...prevState.notifications, deletedAmount: prevState.notifications.deletedAmount + 1, itemInfo: [...prevState.notifications.itemInfo, {...item}]},
      cartItems: this.state.cartItems.filter((item) => item.itemID !== e.target.parentElement.parentElement.getAttribute('itemID')),
    }))

    let items = this.state.cartItems.filter((item) => item.itemID !== e.target.parentElement.parentElement.getAttribute('itemID'));
    let newPrices = {
      cartSubtotal: this.state.cartItems
      .filter((item) => item.itemID !== e.target.parentElement.parentElement.getAttribute('itemID'))
      .map((item) => item.totalPrice)
      .reduce((a, b) => a + b, 0),

      cartTotal: this.state.cartItems
      .filter((item) => item.itemID !== e.target.parentElement.parentElement.getAttribute('itemID'))
      .map((item) => item.totalPrice)
      .reduce((a, b) => a + b, 0),
    };

    this.props.handleCartItemChange(items, newPrices);
  }

  handleRemoveNotification = () => {
    this.setState({
      notifications: INIT_NOTIFICATIONS,
    })
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.handleNextStep();
  }

  render() {
    return (
      <form className="stepComponent cartItemComponent active" id="cartItemComponent" onSubmit={this.handleFormSubmit}>
        <div className="cartNotifications">
          {(this.state.notifications.deletedAmount > 0) && (
            <div className="notification">
              <div className="removeNotificationButton">
                <FontAwesomeIcon icon={faX} onClick={this.handleRemoveNotification} />
              </div>
              <div className="warningSign">
                <FontAwesomeIcon icon={faTriangleExclamation} />
              </div>
              <div className="deletedItemInfo">
                <div>Item(s) were removed by the user:</div>
                <div className="notificationRemovedItems"> 
                {this.state.notifications.itemInfo.map((item) => (
                  <span key={`removeItemID${item.itemID}`} className='notificationItem'>
                    {item.title}, {item.fileType}, {item.linesAmount}
                  </span>
                ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="cartItemsSection">
          <div className="cartHeaders">
            <div className="productHeader">PRODUCT</div>
            <div className="productPricingHeaders">
              <div className="priceHeader">PRICE</div>
              <div className="quantityHeader">QUANTITY</div>
              <div className="totalPriceHeader">TOTAL PRICE</div>
            </div>
          </div>

          <div className="cartList">
            {this.state.cartItems.length > 0 ? this.state.cartItems.map((item) => (
              <div key={`C${item.itemID}`}>
                <div className="itemSeparator"></div>
                <div className="cartItem" itemID={item.itemID}>
                  <div className="deleteItemButton">
                    <FontAwesomeIcon icon={faCircleXmark} onClick={this.handleDeleteItem} />
                  </div>
                  <div className="itemImage">
                    <img src={item.imageLocation} alt="code" />
                  </div>
                  <div className="itemInfo">
                    <div className="forWhatConsumer">{item.for}</div>
                    <div className="itemTitle">{item.title}</div>
                    <div><span>File Type:</span> <span className="itemFileType">{item.fileType}</span></div>
                    <div><span>Amount of Lines:</span> <span className="itemLinesAmount">{item.linesAmount}</span></div>
                  </div>
                  <div className="itemPricingSection">
                    <div className="itemPrice">
                      <div>${Number(item.price).toFixed(2)}</div>
                    </div>
                    <div className="itemQuantity">
                      <select name={item.itemID} itemID={item.itemID} onChange={this.handleQuantityChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>

                    <div className="itemTotalPrice">
                      <div>${Number(item.totalPrice).toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              </div>
            )): (<div className="itemSeparator"></div>)}
          </div>
        </div>
      </form>
    )
  }
}

export default CartItemsComponent;