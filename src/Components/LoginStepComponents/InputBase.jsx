import React from "react";
import './InputBase.css'

const InputBase = ({name, type, value, label, onChange, extraText, classList, errorM}) => (
  <div className="createAccountInput">
    {errorM && <div className="error">{errorM}</div>}
    <div>{label}</div>
    <input type={type} name={name} value={value} onChange={onChange} className={classList} />
    {extraText && <div className="extraText">{extraText}</div>}
  </div>
)

export default InputBase;