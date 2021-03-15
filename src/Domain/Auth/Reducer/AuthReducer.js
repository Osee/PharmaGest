import { LOGIN_ERROR, LOGIN_FECTH, LOGIN_SET } from "../Constants/AuthConstants"


function AuthReducer(state, { type, payload }) {
    switch (type) {
        case LOGIN_FECTH:
            return {
                ...state,
                loading: true,
                error: null
            }
        case LOGIN_SET:
            return {
                ...state,
                loading: false,
                data: payload,
                error: null
            }
        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state
    }

}

export default AuthReducer
