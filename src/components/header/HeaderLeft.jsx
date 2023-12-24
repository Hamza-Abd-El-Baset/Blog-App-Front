const HeaderLeft = ({showNavbar, setShowNavbar}) => {

    return(
        <div className="header-left">

            <div className="header-logo">
                <strong>BLOG</strong>
                <i className="bi bi-pencil"></i>
            </div>

            <div onClick={() => setShowNavbar(!showNavbar)} className="header-menu">
                {showNavbar ? <i className="bi bi-x-lg"></i> : <i className="bi bi-list"></i>}
            </div>

        </div>
    )
}

export default HeaderLeft