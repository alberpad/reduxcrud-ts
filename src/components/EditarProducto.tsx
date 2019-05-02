import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, match } from "react-router-dom";

import { mostrarProducto, editarProducto } from "../store/productos/actions";
import { IProducto, IProductosState } from "../store/productos/types";

interface IEditarProductoState {
  nombre: string;
  precio: string;
  error: boolean;
}

interface IEditarProductoProps {
  mostrarProducto: (id: number) => void;
  editarProducto: (producto: IProducto) => void;
  producto: IProducto;
}

class EditarProducto extends React.Component<
  IEditarProductoProps & Partial<RouteComponentProps>,
  Partial<IEditarProductoState>
> {
  // USAMOS UN STATE LOCAL PORQUE LA INFORMACIÓN DE ESTE COMPONENNTE NO VA HACIA OTROS COMPONENTES
  // SOLO SE ENVIARÁ AL STORE ATRAVES DE UNA ACCIÓN-DISPATCH
  // ESTO ES MAS SENCILLO QUE CONECAR REDUX EN ESTE COMPONENTE

  constructor(props: IEditarProductoProps) {
    super(props);
    this.state = {
      nombre: "",
      precio: "",
      error: false
    };
  }

  componentDidMount() {
    //@ts-ignore
    const { id } = this.props.match.params;
    this.props.mostrarProducto(Number(id));
  }

  componentWillReceiveProps(
    nextProps: IEditarProductoProps & Partial<RouteComponentProps>,
    nextState: Partial<IEditarProductoState>
  ) {
    const { nombre, precio } = nextProps.producto;
    this.setState({
      nombre,
      precio
    });
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
    const { editarProducto, history } = this.props;
    //@ts-ignore
    const { id } = this.props.match.params;

    //TODO: LA ACTION TIENE QUE OBTENERSE DESDE LAS PROPS PARA SE DESPACHE CORRECTAMENTE
    // SI NO SE USARA DESDE LA IMPORTACIÓN Y NO FUNCIONARÁ
    if (!nombre || !precio) {
      this.setState({ error: true });
      return;
    }
    this.setState({ error: false });
    const producto: IProducto = {
      nombre,
      precio,
      id
    };
    editarProducto(producto);
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
              <h2 className="text-center">Editar Producto</h2>
              <form onSubmit={this.handleOnSubmit}>
                <div className="form-group">
                  <label>Titulo</label>
                  <input
                    defaultValue={this.state.nombre}
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
                    defaultValue={this.state.precio}
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
                  Guardar
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

const mapStateToProps = (state: IProductosState) => {
  return state.productos;
};

export default connect(
  mapStateToProps,
  { mostrarProducto, editarProducto }
)(EditarProducto);
