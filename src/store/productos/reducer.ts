// PRODUCTOS REDUCERS

import {
  MOSTRAR_PRODUCTOS,
  IProductosState,
  TProductosActionsTypes,
  ELIMINAR_PRODUCTO,
  AGREGAR_PRODUCTO,
  MOSTRAR_PRODUCTO,
  EDITAR_PRODUCTO
} from "./types";

const initialState: IProductosState = {
  productos: [],
  producto: {
    id: -1,
    nombre: "",
    precio: ""
  }
};

export default function productosReducer(
  state = initialState,
  action: TProductosActionsTypes
) {
  switch (action.type) {
    case MOSTRAR_PRODUCTOS:
      return {
        ...state,
        productos: action.payload
      };
    case ELIMINAR_PRODUCTO:
      return {
        ...state,
        productos: state.productos.filter(
          producto => producto.id !== action.payload
        )
      };
    case AGREGAR_PRODUCTO:
      return {
        ...state,
        productos: [...state.productos, action.payload]
      };
    case MOSTRAR_PRODUCTO:
      return {
        ...state,
        producto: action.payload
      };
    case EDITAR_PRODUCTO:
      return {
        ...state,
        productos: state.productos.map(producto =>
          producto.id === action.payload.id
            ? (producto = action.payload)
            : producto
        )
      };
    default:
      return state;
  }
}
