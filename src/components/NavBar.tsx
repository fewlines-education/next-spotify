import React from "react";

type Props = {
  isLoggedIn: boolean;
  spotifyLoginUrl?: string;
};

const NavBar: React.FC<Props> = ({ isLoggedIn, spotifyLoginUrl }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Artistes, titres ou podcasts"
              aria-label="Search"
            />
          </form>
          <span>
            {isLoggedIn ? (
              <i className="logoLogin fa fa-user-circle-o" aria-hidden="true">
                <a className="login" href="/api/logout">
                  logout
                </a>
              </i>
            ) : (
              <i className="logoLogin fa fa-user-circle-o" aria-hidden="true">
                <a className="login" href={spotifyLoginUrl}>
                  login
                </a>
              </i>
            )}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
