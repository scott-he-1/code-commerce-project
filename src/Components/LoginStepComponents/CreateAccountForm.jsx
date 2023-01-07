import React from "react";
import InputBase from "./InputBase";
import './CreateAccountForm.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { emailValidation, nameValidation, passwordValidation, postcodeValidation } from "./Validations";

const INIT_CREATEACCOUNT = {
  createAccountEmail: '',
  createAccountCreatePassword: '',
  createAccountConfirmPassword: '',
  createAccountFirstName: '',
  createAccountSurname: '',
  createAccountPostcode: '',
}

class CreateAccountForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      createAccountPasswordHide: true,

      createAccount: INIT_CREATEACCOUNT,
      
      registeredEmails: [],

      error: {},
    }
  }

  handleEyeIconSwitch = () => {
    const eyeIconElements = document.getElementsByClassName('passwordHider');
    for (const elm of eyeIconElements) {
      if (elm.classList.contains('active')) {
        elm.classList.remove('active');
      } else {
        elm.classList.add('active')
        this.setState({createAccountPasswordHide: (this.state.createAccountPasswordHide ? false : true)})
      }
    }

    let sensitiveInfo = document.getElementsByClassName('sensitiveInfo');
    for (const elm of sensitiveInfo) {
      if (this.state.createAccountPasswordHide) {
        elm.setAttribute('type', 'text');
      } else {
        elm.setAttribute('type', 'password');
      }
    }
  }

  handleCreateAccountInputs = (e) => {
    this.setState((prevState) => ({
      createAccount: {
        ...prevState.createAccount,
        [e.target.name]: e.target.value,
      },
    }));
  };

  handleCreateAccount = (e) => {
    e.preventDefault();

    const {
      createAccount: {
        createAccountEmail,
        createAccountCreatePassword,
        createAccountFirstName,
        createAccountSurname,
        createAccountPostcode
      }
    } = this.state

    let allClear = true;
    Object.keys(this.state.createAccount).map((key) => {
      let errorText;
      switch (key) {
        case 'createAccountEmail':
          if (this.state.registeredEmails.includes(createAccountEmail)) {
            errorText = 'Email Already Exists';
          } else {
            errorText = emailValidation(createAccountEmail);
          }
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              emailError: errorText,
            },
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;

        case 'createAccountCreatePassword':
          errorText = passwordValidation(createAccountCreatePassword);
          this.setState((prevState) => ({
            error: {
              ...prevState.error, 
              passwordError: errorText,
            }
          }));
          if (errorText !== '') {
            allClear = false;
          }
          break;

        case 'createAccountConfirmPassword':
          errorText = (this.state.createAccount.createAccountCreatePassword === this.state.createAccount.createAccountConfirmPassword) ? '' : 'Password must be the same';
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              confirmPasswordError: errorText,
            }
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;

        case 'createAccountFirstName':
          errorText = nameValidation(createAccountFirstName);
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              firstNameError: errorText,
            }
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;

        case 'createAccountSurname':
          errorText = nameValidation(createAccountSurname);
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              surnameError: errorText,
            }
          }))
          if (errorText !== '') {
            allClear = false;
          }
          break;

        case 'createAccountPostcode':
          errorText = postcodeValidation(createAccountPostcode);
          this.setState((prevState) => ({
            error: {
              ...prevState.error,
              postcodeError: errorText,
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
      let newAccount = {
        [`${createAccountEmail}`]: {
          emailAddress: createAccountEmail,
          password: createAccountCreatePassword,
          name: createAccountFirstName,
          surname: createAccountSurname,
          postcode: createAccountPostcode,
        },
      };

      this.props.registerAccount(newAccount);

      this.setState((prevState) => ({
        registeredEmails: [...prevState.registeredEmails, createAccountEmail],
        createAccount: INIT_CREATEACCOUNT,
      }))

      alert('Successfully Registered Account!');
    }
  }

  handleCreateAccountWithFacebook = (e) => {
    e.preventDefault();
  };

  render() {
    const {createAccountPasswordHide} = this.state;

    const createAccountFields = [
      {label: 'Your Email Address* :', type: 'text', name: 'createAccountEmail', error: 'emailError'},
      {label: 'Create Password* :', 
      type: (createAccountPasswordHide ? 'password' : 'text'), 
      name: 'createAccountCreatePassword', 
      extraText: 'Password must be 8-20, including: at least one capital letter, at least one small letter, one number and one special character - ! @ # $ % & * () _ +', 
      classList: 'sensitiveInfo',
      error: 'passwordError'},
      {label: 'Confirm Password* :', type: (createAccountPasswordHide ? 'password' : 'text'), name: 'createAccountConfirmPassword', classList: 'sensitiveInfo', error: 'confirmPasswordError'},
      {label: 'First Name* :', type: 'text', name: 'createAccountFirstName', error: 'firstNameError'},
      {label: 'Surname* :', type: 'text', name: 'createAccountSurname', error: 'surnameError'},
      {label: 'Postcode* :', type: 'text', name: 'createAccountPostcode', error: 'postcodeError'},
    ] 

    return (
      <form className="createAccountForm" onSubmit={this.handleCreateAccount}>
        {createAccountFields.length ? createAccountFields.map((item) => (
          <InputBase           
          value={this.state.createAccount && this.state.createAccount[item.name]}
          onChange={this.handleCreateAccountInputs}
          classList={item['classList'] ? item.classList : null}
          name={item.name}
          key={item.name}
          type={item.type}
          label={item.label}
          autoComplete="off" 
          extraText={item['extraText'] ? item.extraText : null}
          errorM={
            (this.state.error)
            && (this.state.error[item.error])
            && (this.state.error[item.error].length > 1)
            ? this.state.error[item.error]
            : null
          }
          />
        )): null}
        <FontAwesomeIcon icon={faEye} id="eyeIcon" className="passwordHider" onClick={this.handleEyeIconSwitch}/>
        <FontAwesomeIcon icon={faEyeSlash} id="eyeSlashIcon" className="passwordHider active" onClick={this.handleEyeIconSwitch}/>
        <button className="accountButton">Create Account</button>
        <button className="faceBookButton" onClick={this.handleCreateAccountWithFacebook}>Sign Up With Facebook</button>
      </form>
    )
  }
}
export default CreateAccountForm;