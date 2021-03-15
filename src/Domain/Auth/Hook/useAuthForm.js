import { useState, useContext } from 'react'
import { GlobalContext } from '../../../Context/Provider'
import Login from '../Actions/Login'

function useAuthForm(init = {}) {
    const [form, setform] = useState(init)
    const {
        authState: {
            loading,
            error
        },
        dispatchAuth
    } = useContext(GlobalContext)
    const authFieldsValidate = !form.username?.length || !form.password?.length

    const handleChange = e => {
        const { name, value } = e.target
        setform({ ...form, [name]: value })
    }
    const handleSubmit = e => {
        e.preventDefault();
        Login(form)(dispatchAuth)

    }

    return {
        form,
        handleChange,
        handleSubmit,
        authFieldsValidate,
        loading,
        error
    }
}

export default useAuthForm
