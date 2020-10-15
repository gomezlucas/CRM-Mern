import React, { PureComponent, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import axios from 'axios'

const MejoresClientes = () => {

    const [clientes, setClientes] = useState([])

    useEffect(() => {
        console.log('entrooo')
        let mounted = true;
        axios.get('https://crmnodejsback.herokuapp.com/cliente/best', {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(res => {
                console.log(res.data, 'dataaa essss')
                if (mounted) {
                    setClientes(res.data)
                }
            }
            )
            .catch(error => console.log(error))

        return () => mounted = false;

    }, [])

    const clientesGrafica = clientes.map((cliente, index) => {
        return { ...cliente.cliente[0], total: cliente.total }
    })

    return (
        <Layout>
            <h1 className="text-2xl text-grey-800 font-light">  Best Clientes</h1>
            <ResponsiveContainer
                width={'99%'}
                height={550}
            >
                <BarChart
                    width={600}
                    height={500}
                    data={clientesGrafica}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </Layout>

    );
}

export default MejoresClientes;