import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../../Context/Provider'
import useAuthForm from './Hook/useAuthForm'
import AuthLayout from './Layout/AuthLayout'

function Auth({ onConnect }) {

    const { authState: {
        data
    } } = useContext(GlobalContext)

    useEffect(() => {
        if (data) {
            onConnect(data)
        }
    }, [data, onConnect])

    return (
        <AuthLayout form={useAuthForm()} />
    )
}

export default Auth
