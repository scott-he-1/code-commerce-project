import React from "react";
import './ShippingInputBase.css'

const ShippingInputBase = ({label, name, type, select, onChange, errorM}) => (
  <div className="shippingInput">
    {errorM && <div className="shippingErrorMessage">{errorM}</div>}
    <div className="shippingInputLabel">{label}</div>
    {(type === 'text') && (<input name={name} type={type} className={name} onChange={onChange}/>)}
    {(type === 'select') && (
    <select name={name} className={name} onChange={onChange}>
      {select.map((item) => (
        <option key={item.value} value={item.label}>{item.label}</option>
      ))}
    </select>
    )}
  </div>
)

export default ShippingInputBase;