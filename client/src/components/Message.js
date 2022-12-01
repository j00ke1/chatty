import React from 'react'

const Message = ({ username, messageAuthor, text, timestamp }) => {

  const styleOwnMessage = {
    'paddingLeft': '40%'
  }

  const styleOtherMessage = {
    'paddingRight': '40%'
  }

  const getLocaleTime = (unixTimestamp) => {
    const dateObj = new Date(unixTimestamp)
    const localeString = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    // const time = localeString.slice(0, -3)
    return localeString
  }

  return (
    <div className='message-wrapper' style={username === messageAuthor ? styleOwnMessage : styleOtherMessage}>
      <div className='message-main'>{text}</div>
      <div className='message-details'>
        <div>{messageAuthor}</div>
        <div>{getLocaleTime(timestamp)}</div>
      </div>
    </div>
  )
}

export default Message