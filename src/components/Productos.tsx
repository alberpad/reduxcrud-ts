//PRINCIPAL
import React from "react";
import { connect } from "react-redux";

import { mostrarProductos } from "../store/productos/actions";
import { IProductosState, IProducto } from "../store/productos/types";

import Producto from "./Producto";

export interface IProductosProps {
  mostrarProductos: () => void;
  productos: IProducto[];
}

class Productos extends React.Component<IProductosProps, any> {
  componentDidMount() {
    this.props.mostrarProductos();
  }

  public render() {
    const { productos } = this.props;
    return (
      <React.Fragment>
        <h2 className="text-center my-5">Listado de Productos</h2>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <ul>
              {productos.map(producto => (
                <Producto key={producto.id} producto={producto} />
              ))}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IProductosState) => {
  return state.productos;
};

const mapDispatchToProps = () => {};

export default connect(
  mapStateToProps,
  { mostrarProductos }
)(Productos);
