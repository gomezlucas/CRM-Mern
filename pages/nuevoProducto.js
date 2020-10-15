import React, { useState } from 'react';
import Layout from './../components/Layout';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'
import axios from 'axios'


const NuevoProducto = () => {

    const router = useRouter()
    const [mensaje, setMensaje] = useState()
    const handleSubmit = (valores) => {
        axios.post('https://crmnodejsback.herokuapp.com/product/', { ...valores }, {
            headers: {
                Authorization: localStorage.getItem('token')
            },
        })
            .then(res => {
                setMensaje("Procuct created successfully")
                //Mostrar alerta 
                Swal.fire(
                    'Created!',
                    'The Product has been created successfully',
                    'success'
                )
                //Redireccionar 
                setTimeout(() => {
                    router.push('/productos')
                }, 3000);
            }
            )
            .catch(error => {
                console.log(error.request)
                setMensaje(error.message)
            })
    }


    // Validacion del formulario 
    const formik = useFormik({
        initialValues: {
            name: '',
            quantity: '',
            price: ''
        },

        validationSchema: Yup.object({
            name: Yup.string().required('The field Name cant be empty'),
            quantity: Yup.number()
                .required('The field Name cant be empty')
                .positive('The quantity need to be greater than 0')
                .integer("Enter just integer number")
            ,
            price: Yup.number().required('The field Price cant be empty')
                .positive('Then Price cant be 0')

        }),
        onSubmit: valores => {
            handleSubmit(valores)
        }
    })


    return (
        <Layout>
            <h1 className="text-2xl text-grey-800 font-light"> New Product </h1>
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                        </label>
                            <input
                                type="text"
                                id="name"
                                className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Product's Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.errors.name && formik.touched.name ?
                            <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold"> Error </p>
                                <p> {formik.errors.name} </p>
                            </div>
                            : null}


                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                                Quantity
                        </label>
                            <input
                                type="number"
                                id="quantity"
                                className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Quantity"
                                value={formik.values.quantity}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.errors.quantity && formik.touched.quantity ?
                            <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold"> Error </p>
                                <p> {formik.errors.quantity} </p>
                            </div>
                            : null}



                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                Price
                        </label>
                            <input
                                type="number"
                                id="price"
                                className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Price"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.errors.price && formik.touched.price ?
                            <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold"> Error </p>
                                <p> {formik.errors.price} </p>
                            </div>
                            : null}


                        <input type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                            value="Create New Product"
                        />

                    </form>
                </div>
            </div>
        </Layout>


    );
}

export default NuevoProducto;