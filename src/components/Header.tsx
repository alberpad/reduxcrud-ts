import * as React from "react";
import { Link } from "react-router-dom";

interface IAppProps {}

const Header: React.FunctionComponent<IAppProps> = props => {
  return (
    <nav className="navbar navbar-dark bg-primary justify-content-between d-flex">
      <h1>
        <Link to={"/"} className="text-light">
          CRUD - React, Redux, REST API & Axios
        </Link>
      </h1>

      <Link to={"/productos/nuevo"} className="btn btn-danger nuevo-post">
        Agregar Producto &#43;
      </Link>
    </nav>
  );
};

export default Header;
