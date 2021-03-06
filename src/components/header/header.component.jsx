import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.omponent";
import { selectCartHidden } from "../redux/cart/cart.selector";
import { selectCurrentUser } from "../redux/user/user.selector";
import { signOutStart } from "../redux/user/user.action";
import {createStructuredSelector} from 'reselect'

import "./header.styles.scss";

const Header = ({ currentUser, hidden, signOutStart }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        Contact
      </Link>
      {currentUser ? (
        <div className="option" onClick={signOutStart}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="signin">
          Sign in
        </Link>
      )}
      <CartIcon/>
    </div>
    {
      hidden? null:<CartDropdown/>
    }
  </div>
);

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

const mapDispatchToProps= dispatch =>({
  signOutStart:()=> dispatch(signOutStart())
})
export default connect(mapStateToProps, mapDispatchToProps)(Header);
