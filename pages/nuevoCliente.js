import React, { useState } from 'react';
import Layout from './../components/Layout';
import { useFormik } from 'formik'
import { useRouter } from 'next/router';
import * as Yup from 'yup'
import axios from 'axios';


const NuevoCliente = () => {


    const handleSubmit = (valores) => {

        axios.post('https://crmnodejsback.herokuapp.com/cliente/', { ...valores }, {
            headers: {
                Authorization: localStorage.getItem('token')
            },

        })
            .then(res => {
                setMensaje("User create successfully")
                setTimeout(() => {
                    router.push('/')
                }, 3000);
            }
            )
            .catch(error => {
                console.log(error.request)
                setMensaje(error.message)

            })
    }

    // Estate para el mensaje desde el Server 
    const [mensaje, setMensaje] = useState(null)

    // Routing 
    const router = useRouter()

    // Validacion del formulario    
    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            company: '',
            email: '',
            telephone: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name field cant be empty"),
            lastName: Yup.string().required("LastName field cant be empty"),
            company: Yup.string().required("Company field cant be empty"),
            email: Yup.string().required("Email field cant be empty").email("Email no valid "),
            telephone: Yup.string()
        }),
        onSubmit: async valores => {

            handleSubmit(valores)

         }
    })


    const mostrarMensaje = () => {
        return (
            <div className="bg-gray-100 py-2 px-1 mb-2 w-full max-w-md text-center mx-auto ">
                <p>{mensaje}</p>
            </div>
        )
    }

    return (
        <Layout>
            <h1 className="text-2xl text-grey-800 font-light"> Nuevo Cliente </h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        {mensaje && mostrarMensaje()}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="User's name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.errors.name && formik.touched.name ?
                            <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold"> Error </p>
                                <p> {formik.errors.nombre} </p>
                            </div>
                            : null}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                LastName
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="User's Lastname"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.errors.lastName && formik.touched.lastName ?
                            <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold"> Error </p>
                                <p> {formik.errors.lastName} </p>
                            </div>
                            : null}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                                Company
                            </label>
                            <input
                                type="text"
                                id="company"
                                className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Company"
                                value={formik.values.company}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.errors.company && formik.touched.company ?
                            <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold"> Error </p>
                                <p> {formik.errors.company} </p>
                            </div>
                            : null}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Empresa"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.errors.email && formik.touched.email ?
                            <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold"> Error </p>
                                <p> {formik.errors.email} </p>
                            </div>
                            : null}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telephone">
                                telephone
                            </label>
                            <input
                                type="text"
                                id="telephone"
                                className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Telephone"
                                value={formik.values.telephone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        <input type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                            value="Create New Client"
                        />

                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default NuevoCliente;