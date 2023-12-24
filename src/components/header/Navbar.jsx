import {Link} from "react-router-dom"

const Navbar = ({showNavbar, setShowNavbar}) => {

    return(
        <div style={{clipPath: showNavbar && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} className="navbar">

            <ul className="nav-links">

                <Link to="/" onClick={() => setShowNavbar(false)} className="nav-link">
                    <i className="bi bi-house"></i> Home
                </Link>

                <Link to="/posts" onClick={() => setShowNavbar(false)} className="nav-link">
                    <i className="bi bi-stickies"></i> Posts
                </Link>

                <Link to="posts/create" onClick={() => setShowNavbar(false)} className="nav-link">
                    <i className="bi bi-journal-plus"></i> Create
                </Link>

                <Link to="admin-dashboard" onClick={() => setShowNavbar(false)} className="nav-link">
                    <i className="bi bi-person-check"></i> Admin Dashboard
                </Link>

            </ul>

        </div>
    )
}

export default Navbar