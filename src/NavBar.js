import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setUserAction, setUserServerCheckedAction } from './ducks/user';

const NavBar = (props) => {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Hardcore Gamer
      </Link>
      <ul className="nav justify-content-end">
        {user && user.nickname ? (
          <>
            {process.env.NODE_ENV === 'development' ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/game">
                    Game (dev)
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/assets">
                    Assets (dev)
                  </Link>
                </li>
              </>
            ) : null}

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signin"
                onClick={() => {
                  dispatch(setUserAction(null));
                  dispatch(setUserServerCheckedAction(false));
                  localStorage.clear();
                }}
              >
                Déconnexion
              </Link>
            </li>
            <li className="nav-item">
              <div className="navbar-brand">{user.nickname}</div>
            </li>
          </>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
