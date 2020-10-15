import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Formik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2';
import axios from 'axios'


const EditarCliente = () => {

    const router = useRouter()
    const { query: { id } } = router
    const [client, setClient] = useState({})


    console.log(client, 'the client is ')

    useEffect(() => {
        let mounted = true
        axios.get(`https://crmnodejsback.herokuapp.com/cliente/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(res => {
                if (mounted) {
                    setClient(res.data)
                }
            })
            .catch(error => console.log(error))

        return () => mounted = false
    }, [id])


    const schemaValidation = Yup.object({
        name: Yup.string().required("The field Name cant be empty"),
        lastName: Yup.string().required("The field Lastname cant be empty"),
        company: Yup.string().required("The field Company cant be empty"),
        email: Yup.string().required("The field Email cant be empty").email("Email no valid "),
        telephone: Yup.string()
    })




    // Modifica el cliente en la base de datos 
    const modificarCliente = async (valores) => {
        axios.put(`https://crmnodejsback.herokuapp.com/cliente/${id}`, { ...valores }, {
            headers: {
                Authorization: localStorage.getItem('token')
            },
        })
            .then(res => {
                Swal.fire(
                    'Updated!',
                    'The Client has been updated',
                    'success'
                )
                setTimeout(() => {
                    router.push('/')
                }, 3000);
            }
            )
            .catch(error => {
                console.log(error)
                console.log(error.request)
            })

    }

    return (
        <Layout>
            <h1 className="text-2xl text-grey-800 font-light">  Edit Client </h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <Formik
                        validationSchema={schemaValidation}
                        enableReinitialize={true}
                        initialValues={
                            {
                                name: client.name ? client.name : '',
                                lastName: client.lastName ? client.lastName : '',
                                email: client.email ? client.email : '',
                                company: client.company ? client.company : '',
                                telephone: client.telephone ? client.telephone : ''
                            }
                        }

                        onSubmit={(valores) => {
                            modificarCliente(valores)
                        }
                        }
                    >
                        {
                            props => {
                                return (
                                    <form
                                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                                        onSubmit={props.handleSubmit}
                                    >

                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                placeholder="User's name"
                                                value={props.values.name}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </div>
                                        {props.errors.name && props.touched.name ?
                                            <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                                <p className="font-bold"> Error </p>
                                                <p> {props.errors.name} </p>
                                            </div>
                                            : null}


                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                                lastName
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                placeholder="User's Lastname"
                                                value={props.values.lastName}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </div>
                                        {props.errors.lastName && props.touched.lastName ?
                                            <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                                <p className="font-bold"> Error </p>
                                                <p> {props.errors.lastName} </p>
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
                                                value={props.values.company}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </div>
                                        {props.errors.company && props.touched.company ?
                                            <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                                <p className="font-bold"> Error </p>
                                                <p> {props.errors.company} </p>
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
                                                value={props.values.email}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </div>
                                        {props.errors.email && props.touched.email ?
                                            <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                                <p className="font-bold"> Error </p>
                                                <p> {props.errors.email} </p>
                                            </div>
                                            : null}

                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                                                telephone
                                        </label>
                                            <input
                                                type="text"
                                                id="telephone"
                                                className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                placeholder="Telephone"
                                                value={props.values.telephone}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                        </div>
                                        <input type="submit"
                                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                                            value="Edit Client"
                                        />

                                    </form>
                                )
                            }
                        }
                    </Formik>
                </div>
            </div>
        </Layout>
    );
}

export default EditarCliente;