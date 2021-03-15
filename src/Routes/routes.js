import { UserCreate } from "../Domain/User/User"

const routes = [
    {
        path: "/users/create",
        title: "Create User",
        component: UserCreate
    }
]

export default routes