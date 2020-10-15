import React, { useEffect, useState, useContext } from 'react';
import Select from 'react-select'
import PedidoContext from './../../context/pedidos/PedidoContext';
import axios from 'axios'


const AsignarProducto = () => {

    const [productosElegidos, setProductosElegidos] = useState([])
    const [productos, setProductos] = useState([])
    //context de pedidos 
    const pedidoContext = useContext(PedidoContext)
    const { agregarProducto } = pedidoContext


    useEffect(() => {
        let mounted = true;
        axios.get('https://crmnodejsback.herokuapp.com/product', {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(res => {
                if (mounted) {
                    setProductos(res.data)
                }
            }
            )
            .catch(error => console.log(error))

        return () => mounted = false;

    }, [])



    useEffect(() => {
         agregarProducto(productosElegidos)
    }, [productosElegidos])

    const seleccionarProducto = (productosElegidos) => {
        console.log(productosElegidos)
        if (!productosElegidos) {
            productosElegidos = []
        }
        setProductosElegidos(productosElegidos)
    }

    

    return (
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold"> 2.- Asigna productos al Pedido </p>
            <Select
                options={productos}
                onChange={opcion => seleccionarProducto(opcion)}
                isMulti={true}
                getOptionValue={option => option.name}
                getOptionLabel={option => `${option.name} - ${option.quantity} available`}
                placeholder="Search or Pick Products"
                noOptionsMessage={() => "There is not results"}

            />
        </>

    );
}

export default AsignarProducto;