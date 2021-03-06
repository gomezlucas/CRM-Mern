import React, { useState } from 'react'
import { useRouter } from 'next/router';
import Layout from './../components/Layout';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';


const Login = () => {

    // Mensaje desde el servidor
    const [mensaje, setMensaje] = useState(null)

    // Router 
    const router = useRouter()

    // Submit Action
    const handleClick = (valores) => {
        axios.post('https://crmnodejsback.herokuapp.com/auth', { ...valores })
            .then(res => {
                setMensaje('Autenticando ... ')
                console.log(res.headers.authorization)
                setTimeout(() => {
                          const token = res.headers.authorization
                    localStorage.setItem('token', token)
                }, 1000)

                //Redireccionar
                setTimeout(() => {
                    setMensaje(null)
                    router.push('/')
                }, 3000);
            })
            .catch(error => {
                setMensaje(error.request.responseText)
                
                setTimeout(() => {
                    setMensaje(null)
                }, 3000);
            }
            )

    }


    // Validacion del formulario
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Inserte el email').email("Debe ingresar un email"),
            password: Yup.string().required('El campo no puede estar vacio').min(6, "El password no puede tener menos de seis caracteres")
        }),
        onSubmit: async valores => {
            handleClick(valores)
         }
    })

    const mostrarMensaje = () => {
        return (
            <div className="bg-white py-2 px-3 w-full max-w-sm text-center mx-auto ">
                <p>{mensaje}</p>
            </div>
        )
    }

    // validar Usuario 
    return (
        <>
            <Layout>
                {mensaje && mostrarMensaje()}
                <h1 className="text-center text-white font-light text-2xl"> Login</h1>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm ">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                            </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Email Usuario"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                /></div>
                            {formik.errors.email && formik.touched.email ?
                                <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"> Error </p>
                                    <p> {formik.errors.email} </p>
                                </div>
                                : null}

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                            </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Password Usuario"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                /></div>
                            {formik.errors.password && formik.touched.password ?
                                <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"> Error </p>
                                    <p> {formik.errors.password} </p>
                                </div>
                                : null}
                            <input type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900  "
                                value="Iniciar Sesion"
                            />
                        </form>
                    </div>
                </div>

            </Layout>
        </>

    );
}

export default Login;