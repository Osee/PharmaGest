import { useState, useContext, useEffect } from "react"
import { ERRORS_RESET, ERRORS_SET, ERRORS_SET_DONT_MATCH, ERRORS_SET_MAX_LENGTH, ERRORS_SET_MIN_LENGTH, ERRORS_SET_SHOULD_BE_HAVE_AN_NUMBER, ERRORS_SET_SHOULD_BE_HAVE_AN_UPPERCASE } from "../../../Constants";
import { GlobalContext } from "../../../Context/Provider";
import AddUser from "../Actions/AddUser";

function useUserForm(init = {}) {
    const [form, setform] = useState(init)
    const handleChange = e => {
        const { value, name } = e.target
        setform({ ...form, [name]: value })
    }
    const handleSubmit = e => {
        e.preventDefault();
        AddUser(form, token)(dispatchUser)
        setform({})
    }
    const usersFieldsValidate =
        !form.username?.length || !form.password?.length ||
        !form.repassword?.length || !form.level?.length
    const {
        userState: {
            addUser: {
                loading,
                error
            },
            users: {
                token
            }
        },
        dispatchUser,
        errorState,
        dispatchError
    } = useContext(GlobalContext)


    //Gère les erreurs provenant du server API
    useEffect(() => {
        if (error) {
            const error_res = {}
            const _errs = error.errors.message
            for (const _err of _errs) {
                for (const item in _err) {
                    error_res[item] = _err[item]
                }
            }
            dispatchError({
                type: ERRORS_SET,
                payload: error_res
            })
        }
    }, [dispatchError, error])
    //Gère les erreurs provenant du server API


    //Gère les erreurs dans le UI
    useEffect(() => {
        if (form.username && form.username.length < 3) {
            dispatchError({
                type: ERRORS_SET_MIN_LENGTH,
                payload: { username: "doit avoir au moins 3 caractères" }
            })
        } else if (form.username && form.username.length > 25) {
            dispatchError({
                type: ERRORS_SET_MAX_LENGTH,
                payload: { username: "ne peut avoir plus de 25 caractères" }
            })
        } else if (form.password && !/[A-Z]/.test(form.password)) {
            dispatchError({
                type: ERRORS_SET_SHOULD_BE_HAVE_AN_UPPERCASE,
                payload: { password: "doit avoir un caractère en majuscule" }
            })
        } else if (form.password && !/[0-9]/.test(form.password)) {
            dispatchError({
                type: ERRORS_SET_SHOULD_BE_HAVE_AN_NUMBER,
                payload: { password: "doit contenir au moin un chiffre" }
            })
        } else if (form.password && form.password.length < 6) {
            dispatchError({
                type: ERRORS_SET_MIN_LENGTH,
                payload: { password: "doit avoir au moins 6 caractères" }
            })
        } else if (form.password && form.password.length > 25) {
            dispatchError({
                type: ERRORS_SET_MAX_LENGTH,
                payload: { password: "ne peut avoir plus de 25 caractères" }
            })
        } else if (form.password !== form.repassword) {
            dispatchError({
                type: ERRORS_SET_DONT_MATCH,
                payload: { repassword: "ne correspond pas au mot de passe" }
            })

        } else {
            dispatchError({
                type: ERRORS_RESET
            })
        }

    }, [form, dispatchError])
    //Gère les erreurs dans le UI




    return {
        form,
        handleChange,
        handleSubmit,
        errorState,
        loading,
        usersFieldsValidate

    }
}

export default useUserForm;