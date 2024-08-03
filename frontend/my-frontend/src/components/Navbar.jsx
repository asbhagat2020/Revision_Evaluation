import React from 'react'
import { NavLink } from 'react-router-dom'
const listOfLinks = [
    {
        to: "/",
        displayText: "HomePage",
    },
    {
        to: "/login",
        displayText: "Login",
    },
    {
        to: "/register",
        displayText: "Register",
    },
    {
        to: "/favorites",
        displayText: "Favorites",
    },
];

const defaulStyle = { color: "green" };
const activeStyle = { color: "red" };
export const Navbar = () => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderBottom: "1px solid white",

            }}
        >
       
            {listOfLinks.map((ele) => (
                <NavLink
                    style={({ isActive }) => isActive ? activeStyle : defaulStyle}
                    key={ele.to} to={ele.to}
                >
                    {ele.displayText}
                </NavLink>
            ))}
           
        </div>
    )
}
