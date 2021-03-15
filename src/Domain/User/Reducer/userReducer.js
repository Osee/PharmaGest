import { ADD_USER_ERROR, ADD_USER_FETCH, ADD_USER_SET, CLEAR_ADD_USER_DATA, CSRF_SET, DELETE_USER_LOADING, DELETE_USER_SUCCESS, USERS_ERROR, USERS_FECTH, USERS_SET } from "../Constants/userConstants";

function userReducer(state, { type, payload }) {
    switch (type) {
        case USERS_FECTH:
            return {
                ...state,
                users: {
                    ...state.users,
                    loading: true
                }
            };
        case USERS_SET:
            return {
                ...state,
                users: {
                    ...state.users,
                    loading: false,
                    data: payload
                }
            };
        case USERS_ERROR:
            return {
                ...state,
                users: {
                    ...state.users,
                    error: payload
                }
            };
        case CSRF_SET:
            return {
                ...state,
                users: {
                    ...state.users,
                    loading: false,
                    token: payload
                }
            };
        case ADD_USER_FETCH:
            return {
                ...state,
                addUser: {
                    ...state.addUser,
                    loading: true
                }
            };
        case ADD_USER_SET:
            return {
                ...state,
                addUser: {
                    ...state.addUser,
                    loading: false,
                    data: payload
                },
                users: {
                    ...state.users,
                    data: [payload, ...state.users.data]
                }
            };
        case ADD_USER_ERROR:
            return {
                ...state,
                addUser: {
                    ...state.addUser,
                    loading: false,
                    error: payload
                }
            };
        case CLEAR_ADD_USER_DATA:
            return {
                ...state,
                addUser: {
                    data: null,
                    loading: false,
                    error: null
                }
            };
        case DELETE_USER_LOADING:
            return {
                ...state,
                users: {
                    ...state.users,
                    data: state.users.data.map(item => {
                        if (item.id === payload) {
                            return { ...item, deleting: true }
                        }
                        return item
                    })
                }
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                users: {
                    ...state.users,
                    loading: false,
                    data: [...state.users.data.filter(item => item.id !== payload)]
                }
            };
        default:
            return state;
    }
}

export default userReducer