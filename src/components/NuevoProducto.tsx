import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { agregarProducto } from "../store/productos/actions";
import { IProducto } from "../store/productos/types";

interface INuevoProductoState {
  nombre: string;
  precio: string;
  error: boolean;
}

interface INuevoProductoProps {
  agregarProducto: (producto: Partial<IProducto>) => void;
}

class NuevoProducto extends React.Component<
  INuevoProductoProps & Partial<RouteComponentProps>,
  Partial<INuevoProductoState>
> {
  // USAMOS UN STATE LOCAL PORQUE LA INFORMACIÓN DE ESTE COMPONENNTE NO VA HACIA OTROS COMPONENTES
  // SOLO SE ENVIARÁ AL STORE ATRAVES DE UNA ACCIÓN-DISPATCH
  // ESTO ES MAS SENCILLO QUE CONECAR REDUX EN ESTE COMPONENTE

  constructor(props: INuevoProductoProps) {
    super(props);
    this.state = {
      nombre: "",
      precio: "",
      error: false
    };
  }

  handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { nombre, precio } = this.state;
    //TODO: LA ACTIÓN TIENE QUE OBTENERSE DESDE LAS PROPS PARA SE DESPACHE
    // SI SE USA DIRECTAMENTE DESDE LA IMPORTACIÓN NO FUNCIONA
    const { agregarProducto, history } = this.props;
    if (!nombre || !precio) {
      this.setState({ error: true });
      return;
    }
    this.setState({ error: false });
    const producto: Partial<IProducto> = {
      nombre,
      precio
    };
    console.log(producto);
    agregarProducto(producto);
    if (history) history.push("/");
  };

  public render() {
    const { error } = this.state;
    const mensajeError = error ? (
      <div className="font-weight-bold alert alert-danger text-center mt-4">
        Todos los campos son obligatorios
      </div>
    ) : null;
    return (
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center">Agregar Nuevo Producto</h2>
              <form onSubmit={this.handleOnSubmit}>
                <div className="form-group">
                  <label>Titulo</label>
                  <input
                    onChange={this.handleOnChangeInput}
                    name="nombre"
                    type="text"
                    className="form-control"
                    placeholder="Titulo"
                  />
                </div>
                <div className="form-group">
                  <label>Precio del Producto</label>
                  <input
                    onChange={this.handleOnChangeInput}
                    name="precio"
                    type="text"
                    className="form-control"
                    placeholder="Precio"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                >
                  Agregar
                </button>
              </form>
              {mensajeError}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { agregarProducto }
)(NuevoProducto);
