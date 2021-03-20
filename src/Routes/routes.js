import { UserCreate, UserList } from "../Domain/User/User"

const routes = [
    {
        path: "/users/create",
        title: "Create User",
        component: UserCreate
    },
    {
        path: "/users",
        title: "List of Users",
        component : UserList
    }
]

export default routes