import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
	<>
	<footer className="footer">
      <p>&copy; {new Date().getFullYear()} Pokémon App. All rights reserved.</p>
    </footer>
	</>
  )
}

export default Footer