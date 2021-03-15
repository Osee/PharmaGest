import axiosInstance from "../../../Utils/axiosAPI"
import { CSRF_SET, USERS_ERROR } from "../Constants/userConstants"

const GetToken = (token) => dispatch => {
    if (token) {
        return
    }
    axiosInstance.get("/csrf")
        .then(csrf => dispatch({
            type: CSRF_SET,
            payload: csrf.data
        }))
        .catch(() => dispatch({
            type: USERS_ERROR,
            payload: "Failed to load token"
        }))
}

export default GetToken