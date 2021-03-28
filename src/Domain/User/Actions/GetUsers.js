import axiosInstance from "../../../Utils/axiosAPI"
import { CSRF_SET, USERS_ERROR, USERS_FECTH, USERS_SET } from "../Constants/userConstants"

const GetUsers = ({ loading, data }) => async dispatch => {
    if (data.length !== 0 || loading) {
        return;
    }
    dispatch({
        type: USERS_FECTH
    })
    await axiosInstance.get("/users")
        .then(users => dispatch({
            type: USERS_SET,
            payload: users.data
        }))
        .catch(() => dispatch({
            type: USERS_ERROR,
            payload: "Failed to load DATA"
        }))
    await axiosInstance.get("/csrf")
        .then(csrf => dispatch({
            type: CSRF_SET,
            payload: csrf.data
        }))
        .catch(() => dispatch({
            type: USERS_ERROR,
            payload: "Failed to load CSRF DATA"
        }))
}

export default GetUsers