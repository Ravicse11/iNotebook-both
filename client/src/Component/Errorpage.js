import React from 'react'
import { NavLink } from 'react-router-dom'
function Errorpage() {
    return (
        <>
            <div id="notfound">
                <div className="notfound">
                    <h1>404</h1>
                    <h2>Page Not Found</h2>
                    <span>The page you are looking for is not found</span></div>

                <div className="container" id="navlink">
                    <NavLink to="/" type="button">Go To Home Page</NavLink>
                </div>
            </div>
        </>
    )
}

export default Errorpage
