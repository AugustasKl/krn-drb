import React, {useState} from "react";

import FormInput from "../form-input/form-input.components";
import CustomButton from "../custom-button/custom-button.component";

import { auth, createuserProfileDocument } from "../../firebase/firebase.utils";

import "./sign-up.styles.scss";
import { connect } from "react-redux";
import { signUpStart } from "../redux/user/user.action";

// class SignUp extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       displayName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       phoneNumber:""
//     };
//   }
const SignUp =({signUpStart})=>{
const [userCredentials, setUserCredentials]=useState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber:""
})

const { displayName, email, password, confirmPassword, phoneNumber } = userCredentials
 const handleSubmit = async (event) => {
    event.preventDefault();
    // const{signUpStart}=this.props
    signUpStart({displayName, email, password, phoneNumber})
    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }
};
    // try {
    //   const { user } = await auth.createUserWithEmailAndPassword(
    //     email,
    //     password
    //   );
    //   await createuserProfileDocument(user, { displayName, phoneNumber });
    //   this.setState({
    //     displayName: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    //     phoneNumber: ""
    //   });
      
    // } catch (erorr) {
    //   console.log();
      
    // }
  

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({...userCredentials, [name]: value });
  };
    return (
      <div className="sign-up">
        <h2 className="title"> I do not have an account</h2>
        <span> Sign up with your email and password </span>
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <FormInput
            name="displayName"
            type="text"
            value={displayName}
            onChange={handleChange}
            label="Name"
            required
          />

          <FormInput
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            label="Email"
            required
          />

          <FormInput
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            label="Password"
            required
          />

          <FormInput
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleChange}
            label="Confirm Password"
            required
          />

          <FormInput
            name="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={handleChange}
            label="Phone number"
            required
          />

          <CustomButton type="submit">Sign Up</CustomButton>
        </form>
      </div>
    );
  }

const mapDispatchToProps = dispatch =>({
  signUpStart:(signUpProps)=>dispatch(signUpStart(signUpProps))
})
export default connect(null,mapDispatchToProps)(SignUp);
