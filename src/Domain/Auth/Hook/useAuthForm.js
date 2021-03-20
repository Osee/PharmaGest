import { useContext, useEffect } from 'react'
import { GlobalContext } from '../../../Context/Provider'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Login from '../Actions/Login'


const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
});

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
        defaultValues: init,
        resolver: yupResolver(schema)
    })
    const {
        authState: {
            error
        },
        dispatchAuth
    } = useContext(GlobalContext)

    const onSubmit = async data => {
        await Login(data)(dispatchAuth)
    }

    useEffect(() => {
        if (error) {
            setError("loginFailed", {
                type: "manual",
                message: error.errors?.message
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
