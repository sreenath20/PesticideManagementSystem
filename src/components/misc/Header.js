import React from 'react'
import { Link } from "react-router-dom"
import './Header.css'

const Header = () => {
    return (
        <React.Fragment>
            <header className="bg-image imgBack ">
                <div className="bg-container pt-5">
                    <h2 className='responsive'>Pesticide Management Service</h2>
                    <Link to="/register">Farmer Register here</Link>
                </div>
            </header>
        </React.Fragment>
    )
}

export default Header;