import React, { useState, useEffect } from 'react'
import Layout from './../components/Layout';
import Link from 'next/link'
import Pedido from '../components/Pedido'
import axios from 'axios'
import Swal from 'sweetalert2'

const options = [
    { 'id': 'chocolate', 'nombre': 'chocolate' },
    { 'id': 'frutilla', 'nombre': 'frutilla' },
    { 'id': 'limon', 'nombre': 'limon' },
]



const Pedidos = () => {

    const [pedidos, setPedidos] = useState([])

    useEffect(() => {
        let mounted = true;
        axios.get('https://crmnodejsback.herokuapp.com/pedido', {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(res => {
                if (mounted) {
                    setPedidos(res.data)
                }
            }
            )
            .catch(error => console.log(error))

        return () => mounted = false;

    }, [])

    const verificarEliminarPedido = (id) => {
        Swal.fire({
            title: 'Delete Order?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, !'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`https://crmnodejsback.herokuapp.com/pedido/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
            setPedidos(prev=> prev.filter(item=> item._id !== id))
            }
        })
    }


    return (
        <div>
            <Layout>
                <h1 className="text-2xl text-grey-800 font-light">  Pedidos</h1>
                <Link href="/nuevoPedido">
                    <a className="bg-blue-800 text-white font-bold py-2 px-3 mt-2 rounded inline-block hover:bg-blue-500">  Nuevo Pedido </a>
                </Link>
                {
                    pedidos.length > 0 ?
                        pedidos.map(pedido => <Pedido pedido={pedido} key={pedido._id} verificarEliminarPedido={verificarEliminarPedido} />)
                        :
                        <p className="mt-5 text-center ">
                            No hay Pedidos aun
                    </p>
                }

            </Layout>
        </div>

    );
}

export default Pedidos;