import React, { useState, useEffect } from 'react'
import Layout from './../components/Layout';
import Producto from '../components/Producto'
import Link from 'next/link'
import axios from 'axios'
import Swal from 'sweetalert2'



const Productos = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        let mounted = true;
        axios.get('https://crmnodejsback.herokuapp.com/product', {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(res => {
                if (mounted) {
                    setProducts(res.data)
                    console.log(res.data)
                }
            }
            )
            .catch(error => console.log(error))

        return () => mounted = false;

    }, [])

    const confirmarEliminar = (id) => {
        Swal.fire({
            title: `Desea Eliminar el Producto?`,
            text: "No sera posible deshacer esta operacion",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!'

        }).then(async result => {
            if (result.isConfirmed) {
                try {
                    axios.delete(`https://crmnodejsback.herokuapp.com/${id}`, {
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }
                    })
                    console.log(products)

                    await setProducts(previousprod => previousprod.filter(item => {
                        console.log(item._id, id)
                        return item._id !== id
                    }))
                    console.log(products)

                    Swal.fire(
                        'Eliminado!',
                        'El cliente ha sido eliminado',
                        'success'
                    )
                } catch (e) {
                    console.log(e)
                }
            }
        })
    }


    return (
        <div>
            <Layout>
                <h1 className="text-2xl text-grey-800 font-light">  Products </h1>
                <Link href="/nuevoProducto">
                    <a className="bg-blue-800 text-white font-bold py-2 px-3 mt-2 rounded inline-block hover:bg-blue-500">  Nuevo Producto </a>
                </Link>
                <div className="overflow-x-scroll">

                    <table className="table-auto shadow-md mt-10 w-full w-lg">
                        <thead className="bg-gray-800">
                            <tr className="text-white">
                                <th className="w-1/5 py-2"> Name </th>
                                <th className="w-1/5 py-2"> Quantity </th>
                                <th className="w-1/5 py-2"> Price </th>
                                <th className="w-1/5 py-2"> Delete </th>
                                <th className="w-1/5 py-2"> Edit </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {
                                products.map(product => {
                                    return <Producto producto={product} key={product._id} confirmarEliminar={confirmarEliminar} />
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </Layout>

        </div>

    );
}

export default Productos;