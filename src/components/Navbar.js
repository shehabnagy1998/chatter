import React from 'react'
import './Styling.scss'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="page-navbar">
            <Link to="/" className="page-title">chatter</Link>
        </nav>
    )
}

export default Navbar
