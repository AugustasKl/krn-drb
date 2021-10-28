import "./App.css";
import React from "react";
import HomePage from "./pages/homepage/homepage.component";
import { Switch, Route, Redirect } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createuserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./components/redux/user/user.action";
import { selectCurrentUser } from "./components/redux/user/user.selector";
import CheckoutPage from "./pages/checkout/checkout.components";

import {connect} from 'react-redux'




class App extends React.Component {


  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser}=this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createuserProfileDocument(userAuth);
        console.log(userRef)
        userRef.onSnapshot(snapShot => {
          setCurrentUser ({
            id: snapShot.id,
            ...snapShot.data()
          })
      }) 
      }
      else{
        setCurrentUser(userAuth);
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/signin" render ={()=> this.props.currentUser? (<Redirect to='/'/>): (<SignInAndSignUpPage/>) }/>
          <Route exact path="/checkout" component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state)=>({
  currentUser:selectCurrentUser(state),
})

const mapDispatchToProps = dispatch =>({ 
  setCurrentUser:user=>dispatch(setCurrentUser(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
