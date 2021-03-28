import axiosInstance from "../../../Utils/axiosAPI"
import { ADD_USER_ERROR, ADD_USER_FETCH, ADD_USER_SET, CSRF_SET, USERS_ERROR } from "../Constants/userConstants"


const AddUser =  ({ username, level, password }, _charitecsrf) => async dispatch => {
    dispatch({
        type: ADD_USER_FETCH
    })
   await axiosInstance.post("/users/create", {
        username,
        password,
        level,
        _charitecsrf
    })
        .then(user => dispatch({
            type: ADD_USER_SET,
            payload: user.data
        }))
        .catch(err => dispatch({
            type: ADD_USER_ERROR,
            payload: err.response.data
        }))


   await axiosInstance.get("/csrf")
        .then(csrf => dispatch({
            type: CSRF_SET,
            payload: csrf.data
        }))
        .catch(() => dispatch({
            type: USERS_ERROR,
            payload: "Failed to load CSRF data"
        }))
}

export default AddUser