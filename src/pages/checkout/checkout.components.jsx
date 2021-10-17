import React from "react";
import CartItem from "../../components/cart-item/cart-item.component";
import { connect } from "react-redux";
import "./checkout.styles.scss";
import { selectCartItems } from "../../components/redux/cart/cart.selector";
import { selectCartTotal } from "../../components/redux/cart/cart.selector";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const CheckoutPage = ({ cartItems, total }) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block">
        <span>Product</span>
      </div>
      <div className="header-block">
        <span>Description</span>
      </div>
      <div className="header-block">
        <span>Quantity</span>
      </div>
      <div className="header-block">
        <span>Price</span>
      </div>
      <div className="header-block">
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}

    <div className="total">
      <span>TOTAL: ${total}</span>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
  total: selectCartTotal(state),
});

// const mapDispatchToProps = (dispatch) => ({
//   total: (price) => dispatch(total(price)),
// });

export default connect(mapStateToProps)(CheckoutPage);
