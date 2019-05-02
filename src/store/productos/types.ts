export const MOSTRAR_PRODUCTOS = "MOSTRAR_PRODUCTOS";
export const MOSTRAR_PRODUCTO = "MOSTRAR_PRODUCTO";
export const ELIMINAR_PRODUCTO = "ELIMINAR_PRODUCTO";
export const AGREGAR_PRODUCTO = "AGREGAR_PRODUCTO";
export const EDITAR_PRODUCTO = "EDITAR_PRODUCTO";

export interface IProducto {
  id: number;
  nombre: string;
  precio: string;
}
export interface IProductosState {
  productos: IProducto[];
  producto: IProducto;
}

interface IMostrarProductosAction {
  type: typeof MOSTRAR_PRODUCTOS;
  payload: IProducto[];
}

interface IMostrarProductoAction {
  type: typeof MOSTRAR_PRODUCTO;
  payload: IProducto;
}

interface IEliminarProductoAction {
  type: typeof ELIMINAR_PRODUCTO;
  payload: number; //id del producto
}

interface IAgregarProductoAction {
  type: typeof AGREGAR_PRODUCTO;
  payload: IProducto;
}

interface IEditarProductoAction {
  type: typeof EDITAR_PRODUCTO;
  payload: IProducto;
}

export type TProductosActionsTypes =
  | IMostrarProductosAction
  | IEliminarProductoAction
  | IAgregarProductoAction
  | IMostrarProductoAction
  | IEditarProductoAction;
