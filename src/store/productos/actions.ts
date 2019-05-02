import axios from "axios";
import {
  TProductosActionsTypes,
  MOSTRAR_PRODUCTOS,
  ELIMINAR_PRODUCTO,
  IProducto,
  AGREGAR_PRODUCTO,
  MOSTRAR_PRODUCTO,
  EDITAR_PRODUCTO
} from "./types";
import { Dispatch } from "redux";

export const mostrarProductos = () => async (dispatch: Dispatch) => {
  const response = await axios.get("http://localhost:5000/productos");
  dispatch<TProductosActionsTypes>({
    type: MOSTRAR_PRODUCTOS,
    payload: response.data
  });
};

export const mostrarProducto = (id: number) => async (dispatch: Dispatch) => {
  const response = await axios.get(`http://localhost:5000/productos/${id}`);
  dispatch<TProductosActionsTypes>({
    type: MOSTRAR_PRODUCTO,
    payload: response.data
  });
};

export const eliminarProductos = (id: number) => async (dispatch: Dispatch) => {
  await axios.delete(`http://localhost:5000/productos/${id}`);
  dispatch<TProductosActionsTypes>({
    type: ELIMINAR_PRODUCTO,
    payload: id
  });
};

export const agregarProducto = (producto: Partial<IProducto>) => async (
  dispatch: Dispatch
) => {
  const response = await axios.post(
    `http://localhost:5000/productos/`,
    producto
  );
  dispatch<TProductosActionsTypes>({
    type: AGREGAR_PRODUCTO,
    payload: response.data
  });
};

export const editarProducto = (producto: IProducto) => async (
  dispatch: Dispatch
) => {
  const response = await axios.put(
    `http://localhost:5000/productos/${producto.id}`,
    producto
  );
  dispatch<TProductosActionsTypes>({
    type: EDITAR_PRODUCTO,
    payload: response.data
  });
};

// TODO: DE ESTA FORMA DA ERROR PORQUE SE USA { Y LUEGO FUNCION
// export const mostrarProductos = () => {
//   async (dispatch: Dispatch) => {
//     const response = await axios.get("http://localhost:5000/productos");
//     const productos: IProducto[] = response.data;
//     dispatch<TProductosActionsTypes>({
//       type: MOSTRAR_PRODUCTOS,
//       payload: productos
//     });
//   };
// };
