import React from "react";

const Navbar = ({ setSection }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <a className="navbar-brand" href="#">PDT</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><button className="btn nav-link" onClick={() => setSection("home")}>Home</button></li>
          <li className="nav-item"><button className="btn nav-link" onClick={() => setSection("predict")}>Predict</button></li>
          <li className="nav-item"><button className="btn nav-link" onClick={() => setSection("about")}>About</button></li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
