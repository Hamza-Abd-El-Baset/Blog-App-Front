import {Link} from "react-router-dom"
import { useSelector } from "react-redux"
import isTokenExpired from "../../utils/isTokenExpired"
import { useEffect, useState } from "react"

const Navbar = ({showNavbar, setShowNavbar}) => {
    const {user} = useSelector(state => state.auth)

    const [isTokenValid, setIsTokenValid] = useState(false)

    useEffect(() => {
        setIsTokenValid(!isTokenExpired(user?.token))
    }, [user])

    return(
        <nav style={{clipPath: showNavbar && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} className="navbar">

            <ul className="nav-links">

                <Link to="/" onClick={() => setShowNavbar(false)} className="nav-link">
                    <i className="bi bi-house"></i> Home
                </Link>

                <Link to="/posts" onClick={() => setShowNavbar(false)} className="nav-link">
                    <i className="bi bi-stickies"></i> Posts
                </Link>

                {
                    isTokenValid && (
                        <Link to="posts/create" onClick={() => setShowNavbar(false)} className="nav-link">
                            <i className="bi bi-journal-plus"></i> Create
                        </Link>
                    )
                }

                {
                    (isTokenValid && user?.isAdmin) && (
                        <Link to="admin-dashboard" onClick={() => setShowNavbar(false)} className="nav-link">
                            <i className="bi bi-person-check"></i> Admin Dashboard
                        </Link>
                    )
                }
                
            </ul>

        </nav>
    )
}

export default Navbar