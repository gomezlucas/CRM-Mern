import React from 'react'
import { useRouter } from 'next/router';






const Header = () => {
    const router = useRouter()


    const cerrarSesion = () => {
        router.push('/login')
        localStorage.removeItem('token')
    }

    return (
        <div className="sm:flex sm:justify-between mb-6">
            <p className="mb-5 lg:mb-0"> Hello  </p>
            <button
                className="bg-blue-800 font-bold w-full sm:w-auto text-white rounded px-3 py-1 text-xs uppercase shadow-md hover:bg-blue-500 w-full lg:w-auto text-center"
                type="button"
                onClick={() => cerrarSesion()}
            > Cerrar Sesion </button>
        </div>
    )

}


export default Header
