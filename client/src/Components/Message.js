import React from 'react'
import '../css/Message.css'

const Message = ({message, error}) => {
  return (
    <div className={`message ${error ? 'error-true' : 'error-false'}`}>{message}</div>
  )
}

export default Message