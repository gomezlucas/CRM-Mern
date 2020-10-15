import React, { useEffect, useState, useContext } from 'react';
import Select from 'react-select'
import PedidoContext from '../../context/pedidos/PedidoContext';
import axios from 'axios'


const AsignarCliente = () => {
    const [cliente, setCliente] = useState('')

    // Context de Pedidos 
    const pedidoContext = useContext(PedidoContext)
    const {agregarCliente } = pedidoContext
    const [clientes, setClientes] = useState([])
 
    useEffect(() => {
        
        agregarCliente(cliente)
    }, [cliente])
    
    
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
 
    
     

    const seleccionarCliente = cliente =>{
        setCliente(cliente)
    }
    return (
        <>
        <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold"> 1.- Choose a Client </p>   
        <Select
           options={clientes}
             onChange={ opcion => seleccionarCliente(opcion) }
            getOptionValue={option=> option._id}
            getOptionLabel={option => option.name}
            placeholder="Search or find a Client"
            noOptionsMessage={()=> "Theres is no results"}

        />
        </>
    );
}

export default AsignarCliente;