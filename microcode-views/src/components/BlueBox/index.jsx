import React from 'react'
import logo from '../../assets/images/logo.png'
import '../BlueBox/bluebox.css'


const BlueBox = () => {
  return (
    <div className="blue-box">
          <div className="blue-box-content">
            <img src={logo} alt="Logo" className="blue-box-logo" />
            <h1 className='text-bluebox'>Micro-nize your code, maximize your impact!</h1>
          </div>
        </div>
  )
}

export default BlueBox
