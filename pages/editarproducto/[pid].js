import React, { useState, useEffect } from 'react';
import Layout from './../../components/Layout';
import { useRouter } from 'next/router';
import { Formik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2';
import axios from 'axios'



const EditarProducto = () => {
    const router = useRouter()
    const { query: { id } } = router
    const [product, setProduct] = useState({})




    useEffect(() => {
        let mounted = true
        axios.get(`https://crmnodejsback.herokuapp.com/product/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(res => {
                if (mounted) {
                    setProduct(res.data)
                }
            })
            .catch(error => console.log(error))

        return () => mounted = false
    }, [id])



    const schemaValidation = Yup.object({
        name: Yup.string().required('The field Name cant be empty'),
        quantity: Yup.number()
            .required('The field Name cant be empty')
            .positive('The quantity need to be greater than 0')
            .integer("Enter just integer number"),
        price: Yup.number().required('The field Price cant be empty')
            .positive('Then Price cant be 0')

    })


    const actualizarProductosInfo = async (valores) => {
        axios.put(`https://crmnodejsback.herokuapp.com/product/${id}`, { ...valores }, {
            headers: {
                Authorization: localStorage.getItem('token')
            },
        })
            .then(res => {
                Swal.fire(
                    'Updated!',
                    'The Product has been updated',
                    'success'
                )
                setTimeout(() => {
                    router.push('/productos')
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
            <h1 className="text-2xl text-grey-800 font-light"> Edit Product </h1>
            <Formik
                validationSchema={schemaValidation}
                enableReinitialize={true}
                initialValues={
                    {
                        name: product.name ? product.name : '',
                        quantity: product.quantity ? product.quantity : '',
                        price: product.price ? product.price : '',
                    }
                }
                onSubmit={valores => {
                    actualizarProductosInfo(valores)
                }}
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
                                        placeholder="Product's Name"
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
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                                        Quantity
                            </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        className="shadow appearence-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Quantity"
                                        value={props.values.quantity}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                </div>
                                {props.errors.quantity && props.touched.quantity ?
                                    <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold"> Error </p>
                                        <p> {props.errors.quantity} </p>
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
                                        value={props.values.price}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                </div>
                                {props.errors.price && props.touched.price ?
                                    <div className="my2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold"> Error </p>
                                        <p> {props.errors.price} </p>
                                    </div>
                                    : null}
                                <input type="submit"
                                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                                    value="Create New Product"
                                />

                            </form>
                        )
                    }
                }

            </Formik>
        </Layout >

    );
}

export default EditarProducto;