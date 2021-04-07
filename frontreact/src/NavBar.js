import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    return(
        <div>
            <ul>
                <li><Link to="/home">Acceder al Inicio</Link></li>
            </ul>
        </div>
    )
}

export default NavBar;