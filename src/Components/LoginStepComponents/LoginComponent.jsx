import React from "react";
import CreateAccountForm from "./CreateAccountForm";
import './LoginComponent.css'
import InputBase from "./InputBase";
import { handleSignInSwitch, handleCreateAccountSwitch } from "./Effects";

const INIT_SIGNIN = {
  signInEmail: '',
  signInPassword: '',
}

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: INIT_SIGNIN,

      error: {},

      registeredAccounts: {},
    }
  }

  handleRegisterAccount = (newAccountData) => {
    this.setState((prevState) => ({
      registeredAccounts: {...prevState.registeredAccounts, ...newAccountData}
    }))
  }

  handleSignInInputs = (e) => {
    this.setState((prevState) => ({
      signIn: {
        ...prevState.signIn,
        [e.target.name]: e.target.value,
      },
    }))
  };

  handleSignInWithFacebook = (e) => {
    e.preventDefault();
  }

  handleSignIn = (e) => {
    e.preventDefault();

    const {
      signIn: {
        signInEmail,
        signInPassword,
      },
      registeredAccounts
    } = this.state;

    let allClear = true;
    Object.keys(this.state.signIn).map((key) => {
      let errorText;
      switch (key) {
        case 'signInEmail':
          if (!registeredAccounts[signInEmail]) {
            errorText = 'This Email does not exist'
          } else {
            errorText = '';
          }
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              signInEmailError: errorText
            }
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;

        case 'signInPassword':
          if (registeredAccounts[signInEmail] && registeredAccounts[signInEmail].password === signInPassword) {
            errorText = '';
          } else if (signInPassword.length === 0) {
            errorText = 'Please enter a Password'
          } else {
            errorText = 'Invalid Password';
          }
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              signInPasswordError: errorText
            }
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;
        default:
          break;
      }
    })
    if (allClear) {
      localStorage.setItem('loggedInEmail', signInEmail)
      let currentStep = e.target.parentElement.parentElement;
      this.setState({
        signIn: INIT_SIGNIN,
      })
      currentStep.classList.remove('active');
      currentStep.nextSibling.classList.add('active');
    }
  }

  render() {
    const signInFields = [
      {label: 'Email Address', type: 'text', name: 'signInEmail', error: 'signInEmailError'},
      {label: 'Password', type: 'password', name: 'signInPassword', error: 'signInPasswordError'}
    ]

    return (
      <div className="container signInSignUp active" id="signInSignUp">
        <div className="signInSection active" id="signInSection">
          <div className="signInSelector" onClick={handleSignInSwitch}>SIGN IN</div>

          <form className="signInForm" onSubmit={this.handleSignIn}>
            {signInFields.length ? signInFields.map((item) => (
              <InputBase 
              value={this.state.signIn && this.state.signIn[item.name]}
              onChange={this.handleSignInInputs}
              name={item.name}
              key={item.name}
              type={item.type}
              label={item.label}
              autoComplete='off'
              extraText={item['extraText'] ? item.extraText : null}
              errorM={
                (this.state.error
                && this.state.error[item.error]
                && this.state.error[item.error].length > 1)
                ? this.state.error[item.error]
                : null
              }
              />
            )): null}
            <button className="accountButton">Sign In</button>
            <button className="faceBookButton" onClick={this.handleSignInWithFacebook}>Login With Facebook</button>
          </form>
        </div>

        <div className="createAccountSection" id="createAccountSection">
          <div className="createAccountSelector" onClick={handleCreateAccountSwitch}>CREATE ACCOUNT</div>
          <CreateAccountForm registerAccount={this.handleRegisterAccount} />
        </div>
      </div>
    )
  }
}

export default LoginComponent;