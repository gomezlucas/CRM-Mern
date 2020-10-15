import React from 'react';
import Swal from 'sweetalert2'
import Router from 'next/router'
import axios from 'axios'



const Cliente = ({ cliente }) => {
    const { name, lastName, company, email, _id } = cliente


   


    const editarCliente = (id) => {
        Router.push({
            pathname: '/editarcliente/[id]',
            query: { id }
        })
    }

    return (
        <tr>
            <td className="border px-4 py-2 text-black "> {name} {lastName}</td>
            <td className="border px-4 py-2"> {company} </td>
            <td className="border px-4 py-2"> {email} </td>
            <td className="border px-4 py-2">
                <button
                    className="flex justify-center align-center bg-red-700 text-white font-bold py-1 px-2 w-full text-sm hover:bg-red-900 rounded"
                    onClick={() => confirmarEliminar(_id)}
                >
                    Delete
                        <svg className="w-6 h-6 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
            </td>
            <td className="border px-4 py-2">
                <button
                    className="flex justify-center align-center bg-green-700 text-white font-bold py-1 px-2 w-full text-sm hover:bg-green-900 rounded"
                    onClick={() => editarCliente(_id)}
                >
                    Edit
                    <svg className="w-6 h-6 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
            </td>
        </tr>
    );
}

export default Cliente;