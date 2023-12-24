import './header.css'
import { useState } from 'react'
import HeaderLeft from './HeaderLeft'
import Navbar from './Navbar'
import HeaderRight from './HeaderRight'

const Header = () => {

    const [showNavbar, setShowNavbar] = useState()

    return(
        <header className="header">

            <HeaderLeft showNavbar={showNavbar} setShowNavbar={setShowNavbar} />

            <Navbar showNavbar={showNavbar} setShowNavbar={setShowNavbar} />

            <HeaderRight/>

        </header>
    )
}

export default Header
