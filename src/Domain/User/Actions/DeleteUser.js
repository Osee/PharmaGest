import axiosInstance from "../../../Utils/axiosAPI"
import { DELETE_USER_LOADING, DELETE_USER_SUCCESS } from "../Constants/userConstants"

const DeleteUser = (id, _charitecsrf) => async dispatch => {
    dispatch(
        {
            type: DELETE_USER_LOADING,
            payload : id
        }
    )
    await axiosInstance.delete(`/users/${id}`, {
        method: "DELETE",
        data: {
            id,
            _charitecsrf
        }
    }).then(res => dispatch(
        {
            type: DELETE_USER_SUCCESS,
            payload : id
        }
    )).catch(err => console.error(err))
}

export default DeleteUser