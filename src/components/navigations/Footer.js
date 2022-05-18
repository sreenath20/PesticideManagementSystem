import React from 'react'
import { Link } from "react-router-dom"

import './Footer.css'

const MenuBar = () => {
    return (
        <footer >
            <div className="footer">
                <ul>
                    <li><Link to="/">Home</Link></li>
                </ul>

                <p>&copy; Developed by Gowtham Shanmugam. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default MenuBar;