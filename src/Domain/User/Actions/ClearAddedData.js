import { CLEAR_ADD_USER_DATA } from "../Constants/userConstants";

const ClearAddedData = () => dispatch => dispatch({
    type: CLEAR_ADD_USER_DATA
})

export default ClearAddedData;