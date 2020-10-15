import React, { useContext, useState } from 'react';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import AsignarProducto from '../components/pedidos/AsignarProducto';
import Layout from './../components/Layout';
import ResumenPedido from '../components/pedidos/ResumenPedido'
import TotalPedido from './../components/pedidos/TotalPedido';
// Context de pedidos
import PedidoContext from './../context/pedidos/PedidoContext';
import { useRouter } from 'next/router'
import axios from 'axios'
import Swal from 'sweetalert2';



const NuevoPedido = () => {

    // Utilizar context y extraer sus funciones y valores
    const pedidoContext = useContext(PedidoContext)
    const { productos, total, cliente } = pedidoContext



    //State para mensaje 
    const [mensaje, setMensaje] = useState('')

    //routing 
    const router = useRouter()

    const validarPedido = () => {
        return !productos.every(producto => producto.cantidad > 0) || total === 0 || cliente.length ? 'opacity-50 cursor-not-allowed' : ''
    }


    //Crear nuevo pedido
    const crearNuevoPedido = async () => {
         const pedido = productos.map(({ __typename, existencia, creado, ...producto }) => producto)
        const { _id } = cliente
                axios.post('https://crmnodejsback.herokuapp.com/pedido/', { pedido, _id, total }, {
            headers: {
                Authorization: localStorage.getItem('token')
            },

        })
            .then(res => {
                //Mostrar alerta 
                Swal.fire(
                    'Created!',
                    'The Order has been created successfully',
                    'success'
                )   
 
                setTimeout(() => {
                    router.push('/pedidos')
                }, 3000);
            }
            )
            .catch(error => {
                 setMensaje(error.request.responseText)
                setTimeout(() => {
                    setMensaje(null)
                }, 3000);
            })  

    }

    const mostrarMensaje = () => {
        return (
            <div className="bg-white py-2 px-1 mt-4 w-full max-w-lg text-center mx-auto ">
                <p>{mensaje}</p>
            </div>
        )
    }



    return (
        <Layout>
            <h1 className="text-2xl text-grey-800 font-light"> Create New Order </h1>
            {mensaje && mostrarMensaje()}

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <AsignarCliente />
                    <AsignarProducto />
                    <ResumenPedido />
                    <TotalPedido />

                    <button type="button"
                        className={`bg-gray-800  w-full mt-5 p-2 text-white  uppercase font-bold hover:bg-blue-700 ${validarPedido()}`}
                        onClick={() => crearNuevoPedido()}
                    >
                        Add Order
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default NuevoPedido

