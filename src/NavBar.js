import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Hardcore Gamer
      </Link>
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link className="nav-link" to="/signin">
            Connexion
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">
            Créer un compte
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
