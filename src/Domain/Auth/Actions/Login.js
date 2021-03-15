import axiosInstance from "../../../Utils/axiosAPI"
import { LOGIN_ERROR, LOGIN_FECTH, LOGIN_SET } from "../Constants/AuthConstants"

const Login = ({ username, password }) => dispatch => {
    dispatch({
        type: LOGIN_FECTH
    })
    axiosInstance.post("/login", {
        username,
        password
    })
        .then(user => dispatch({
            type: LOGIN_SET,
            payload: user.data
        }))
        .catch(err => dispatch({
            type: LOGIN_ERROR,
            payload: err.response.data
        }))

}

export default Login