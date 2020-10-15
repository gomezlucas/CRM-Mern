import { useEffect, useState } from 'react'
import Layout from '../components/Layout';
import Link from 'next/link'
import axios from 'axios';
import Cliente from '../components/Cliente'

export default function Home() {

  const [clientes, setClientes] = useState([])

  useEffect(() => {
    let mounted = true;
    axios.get('https://crmnodejsback.herokuapp.com/cliente', {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => {
        if (mounted) {
          setClientes(res.data)
        }
      }
      )
      .catch(error => console.log(error))

    return () => mounted = false;

  }, [])

  const confirmarEliminar = (id) => {
    console.log(id, 'iddddd')
    Swal.fire({
      title: `Desea Eliminar el Cliente? ${name} ${lastName}`,
      text: "No sera posible deshacer esta operacion",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'

    }).then(async result => {
      console.log()
      if (result.isConfirmed) {
        try {
          axios.delete(`https://crmnodejsback.herokuapp.com/cliente/${id}`, {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          })
          Swal.fire(
            'Eliminado!',
            'El cliente ha sido eliminado',
            'success'
          )
          setClientes(prev => prev.filter(client => client._id !== id))
        } catch (e) {
          console.log(e)
        }
      }
    })
  }

  return (
    < >
      <Layout>
        <h1 className="text-2xl text-grey-800 font-light"> Clients </h1>
        <Link href="/nuevoCliente">
          <a className="bg-blue-800 text-white font-bold py-2 px-3 mt-2 rounded inline-block hover:bg-blue-500">  Nuevo Cliente </a>
        </Link>

        <div className="overflow-x-scroll">
          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/5 py-2"> Name </th>
                <th className="w-1/5 py-2"> Company </th>
                <th className="w-1/5 py-2"> Email </th>
                <th className="w-1/5 py-2"> Delete </th>
                <th className="w-1/5 py-2"> Edit </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {
                clientes.map(cliente => <Cliente cliente={cliente} key={cliente._id} confirmarEliminar={confirmarEliminar} />
                )
              }
            </tbody>
          </table></div>
      </Layout>
    </ >
  )

}
