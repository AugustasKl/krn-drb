import React, { useState } from "react";
import FormInput from "../form-input/form-input.components";
import CustomButton from "../custom-button/custom-button.component";
import { googleSignInStart, emailSignInStart } from "../redux/user/user.action";

import { connect } from "react-redux";
import "./sign-in.styles.scss";

// class SignIn extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       email: "",
//       password: "",
//     };
//     console.log(this.state);
//   }

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const { emailSignInStart } = this.props; sitas eina i SignIn props
    // const {email, password} = this.state
    emailSignInStart(email, password);
  };

  const handleChange = (event) => {
    console.log(event.target);
    const { value, name } = event.target;
    // this.setState({ [name]: value });
    setCredentials({ ...userCredentials, [name]: value }); // we are spreading all of our user credentials and ther we are going to update the value that needs to be changed
  };

  // render() {
  //   const { googleSignInStart } = this.props;
  return (
    <div className="sign-in">
      <h2> I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          handleChange={handleChange}
          label="email"
          required
        />

        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="password"
          required
        />
        <div className="buttons">
          <CustomButton type="submit">Sign in</CustomButton>
          <CustomButton
            type="button"
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
