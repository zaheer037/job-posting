import React from 'react'
import "./Header.css"
const Header = () => {
  return (
    <header className="header">
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/67fb07e7aed1acee9a0c377496dd9cfd5b61610c3ac4aba07619721ec4c9a670?placeholderIfAbsent=true&apiKey=b3fe187d143142f4a43462766a1f5b1d" alt="Company Logo" className="logo" />
      <nav>
        <a href="#contact" style={{textDecoration:"none",color:"grey",paddingRight:"20px"}}>Contact</a>
      </nav>
    </header>
  )
}

export default Header