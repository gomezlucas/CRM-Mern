
import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS,
    ACTUALIZAR_TOTAL
} from '../../types'


export default (state, action) => {
    switch (action.type) {
        case SELECCIONAR_CLIENTE:
            return {
                ...state,
                cliente: action.payload
            }
        case SELECCIONAR_PRODUCTO:
            return {
                ...state,
                productos: action.payload
            }
        case CANTIDAD_PRODUCTOS:
            return {
                ...state,
                productos: state.productos.map(producto => producto._id === action.payload._id ? action.payload : producto)
            }
        case ACTUALIZAR_TOTAL:
            return {
                ...state, total: state.productos.reduce((acc, prod) => acc += prod.price * prod.cantidad, 0)
            }
        default:
            return state
    }
} 