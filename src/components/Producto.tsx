import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { IProducto } from "../store/productos/types";
import { eliminarProductos } from "../store/productos/actions";

export interface IProductoProps {
  producto: IProducto;
  eliminarProductos: (id: number) => void;
}

class Producto extends React.Component<IProductoProps> {
  handdleOnClikcEliminiar = () => {
    const { eliminarProductos } = this.props;
    const { id } = this.props.producto;
    eliminarProductos(id);
  };

  public render() {
    const { id, nombre, precio } = this.props.producto;
    return (
      <li className="list-group-item">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-8 d-flex justify-content-between aliign-items-center">
            <p className="text-dark m-0">{nombre}</p>
            <span className="badge badge-warning text-dark">$ {precio}</span>
          </div>
          <div className="col-md-4 d-flex justify-content-end acciones">
            <Link
              to={`/productos/editar/${id}`}
              className="btn btn-primary mr-2"
            >
              Editar
            </Link>
            <button
              onClick={this.handdleOnClikcEliminiar}
              type="button"
              className="btn btn-danger"
            >
              Eliminar
            </button>
          </div>
        </div>
      </li>
    );
  }
}

export default connect(
  null,
  { eliminarProductos }
)(Producto);
