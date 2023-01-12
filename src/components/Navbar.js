import "../styles/Navbar.css"
import Logo from "../media/burger.png"
import Slice from "../media/pizzaSlice.png"
import { Link, NavLink } from "react-router-dom";
import { useState, useRef } from 'react';
import { FaBars, FaTimes } from "react-icons/fa"
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
    const { currentUser, logout } = useAuth();
    const [navbar, setNavbar] = useState(false);
    const navRef = useRef();
    const showNavbar = () => {
        navRef.current.classList.toggle("toggle-show")
    }
    const hideNavbar =()=>{
        navRef.current.classList.remove("toggle-show")
    }
    const changeNavbarBackground = () => {
        if (window.scrollY >= 55) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };
    window.addEventListener('scroll', changeNavbarBackground);
    async function handleLogout() {
        try {
            await logout()
            sessionStorage.setItem("level", "not logged in")
        } catch {
            console.log('did not log out')
        }
    }

    return (
        <header className={navbar ? 'nav active' : 'nav'}>
            <Link to="/" className="nav-title"><img src={Logo}></img> oneByte </Link>
            <nav ref={navRef} className="nav-links">
                    <NavLink to="/Download" onClick={hideNavbar}>Download</NavLink>
                    <NavLink to="/Create" onClick={hideNavbar}>Create</NavLink>
                    { currentUser ? <NavLink to="/"  onClick={()=> {hideNavbar(); handleLogout()}}>Log Out <img src={Slice}></img></NavLink> : <NavLink to="/Login" onClick={hideNavbar}>Login </NavLink> }
                    <button className="nav-btn nav-close-btn" onClick={showNavbar}>< FaTimes /></button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}><FaBars /></button>
        </header>
    )
}


