import {useState} from "react"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-ff-surface border-bottom border-ff px-3">
            <div className="container-fluid">

                {/* brand */}
                <a className="navbar-brand fw-bold text-ff-primary fs-4">Fit
                   <span className="text-ff-secondary">Frame</span> </a>

                {/* toggler per mobile */}
                <button className="navbar-toggler"
                type="button"
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

              {/* Links: usiamo le classi dinamiche di Bootstrap regolate dallo stato */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/allenamento">Allenati</a>
            </li>
            <li className="nav-item">
              <a className="nav-link btn btn-outline-light btn-sm ms-lg-3 px-3 mt-2 mt-lg-0 text-white" href="/logout">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar