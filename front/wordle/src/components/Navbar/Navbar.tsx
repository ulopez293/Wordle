import './Navbar.css'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <nav className="navegador navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={() => setIsOpen(false)}>
          Wordle
        </Link>
        <button className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav">
            <li className={`nav-item ${pathname === '/score' ? 'active' : ''}`}>
              <Link className="nav-link" to="/score" onClick={handleLinkClick}>
                Score Table
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
