import './Navbar.css'

const Navbar = () => {
    return (
        <nav className="navegador navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="navbar-brand" >Wordle</div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Score Table</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Features</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
