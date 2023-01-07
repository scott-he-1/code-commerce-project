import './App.css';
import CheckoutProcess from './Components/CheckoutStepComponents/CheckoutProcess';
import LoginComponent from './Components/LoginStepComponents/LoginComponent';

function App() {
  return (
    <div className="App">
      <LoginComponent />
      <CheckoutProcess signedInEmail=''/>
    </div>
  );
}

export default App;
