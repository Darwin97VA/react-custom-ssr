import React from 'react'
import { Link } from 'react-router-dom'

export default ({children}) => {
    return (
        <div>
        <header>
            <ul>
                <Link to="/">Home</Link>
                <Link to="/contact">Contact</Link>
            </ul>
        </header>
        <main>
            {children}
        </main>
        </div>
    )
}