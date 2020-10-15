import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import axios from 'axios'


const Pedido = ({ pedido, verificarEliminarPedido }) => {

    console.log(pedido)
    const { _id, total, client: { name, lastName, telephone, email }, state } = pedido

    const [estadoPedido, setEstadoPedido] = useState(state)

    const [clase, setClase] = useState('')

    useEffect(() => {
        if (estadoPedido) {
            setEstadoPedido(estadoPedido)
        }
        cambiarClase()
    }, [estadoPedido])


    const cambiarClase = () => {
        if (estadoPedido === "PENDIENTE") {
            setClase('border-yellow-500')
        } else if (estadoPedido === "COMPLETADO") {
            setClase('border-green-700')
        } else {
            setClase('border-red-800')
        }
    }


    const cambiarEstadoPedido = async (state) => {
        await axios.put(`https://crmnodejsback.herokuapp.com/pedido/${_id}`,  {state} , {
            headers: {
                Authorization: localStorage.getItem('token')
            },
        })
            .then(res => {
                Swal.fire(
                    'Updated!',
                    'The Order has been updated',
                    'success'
                )

                setEstadoPedido(state)
            }
            )
            .catch(error => {
                console.log(error)
                console.log(error.request)
            })
    }
    return (
        <div className={`${clase} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-md`}>
            <div>
                <p className="font-bold text-gray-800">Client: {name} {lastName}</p>
                {email &&
                    <p className="flex items-center my-2">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        {email}
                    </p>
                }
                {telephone &&
                    <p className="flex items-center my-2">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        {telephone}
                    </p>
                }


                <h2 className="font-bold text-gray-800 mt-10"> Order State: </h2>



                <select
                    className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 text-xs font-bold"
                    value={estadoPedido}
                    onChange={(e) => cambiarEstadoPedido(e.target.value)}
                >
                    <option value="COMPLETADO" >COMPLETED</option>
                    <option value="PENDIENTE" >PENDING</option>
                    <option value="CANCELADO" >CANCELED</option>

                </select>

            </div>
            <div>
                <h2 className="text-gray-800 font-bold mt-10">
                    Summary
                </h2>
                {pedido.pedido.map(articulo => (
                    <div key={articulo.id} className="mt-4">
                        <p className="text-sm text-gray-600">Producto: {articulo.name}</p>
                        <p className="text-sm text-gray-600">Cantidad: {articulo.cantidad} </p>

                    </div>
                ))}

                <p className="text-gray-800 mt-3 font-bold">Total:
                <span className="font-light">$ {total}</span>
                </p>
                <button
                    className=" mt-4 flex justify-center items-center bg-red-700 text-white font-bold py-1 px-2 text-xs hover:bg-red-900 rounded"
                    onClick={() => verificarEliminarPedido(_id)}
                >
                    Delete Order
                    <svg className="w-6 h-6 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>            </div>
        </div>


    );
}

export default Pedido;