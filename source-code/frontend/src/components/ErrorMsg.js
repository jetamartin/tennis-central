import React from 'react';
import './ErrorMsg.css'

const ErrorMsg = ({errorMsg}) => {
  return (
    <div className="ErrorMsg-messages">{errorMsg}</div>
  )
}
export default ErrorMsg; 