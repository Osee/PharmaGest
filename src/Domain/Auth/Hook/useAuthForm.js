import { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../Context/Provider'
import { useForm } from "react-hook-form"
import Login from '../Actions/Login'

function useAuthForm(init = {}) {
    const {
        register,
        handleSubmit,
        formState: {
            isSubmitting,
        },
        setError,
        errors,
        clearErrors
    } = useForm({
        mode: "onTouched",
        defaultValues: init
    })
    const {
        authState: {
            error
        },
        dispatchAuth
    } = useContext(GlobalContext)

    const onSubmit = data => {
        Login(data)(dispatchAuth)
    }

    useEffect(() => {
        if (error) {
            setError("loginFailed", {
                type: "manual",
                message: error.errors.message
            })
            return () => clearErrors()
        }
    }, [clearErrors, error, setError])

    return {
        register,
        handleSubmit,
        onSubmit,
        isSubmitting,
        errors
    }
}

export default useAuthForm
