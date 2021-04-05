import React, { useEffect, useContext, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Grid, LinearProgress, makeStyles, Paper } from "@material-ui/core"
import useToggle from '../../Hooks/useToggle';
import { GlobalContext } from '../../Context/Provider';
import GetToken from './Actions/GetToken';
import { UserCreateLayout } from './Layout/UserFormLayout';
import UserListLayout from './Layout/UserListLayout';
import  useUserForm  from './Hooks/useUserForm';
import { SnackWithAction } from "../../Components/feedback"
import ClearAddedData from './Actions/ClearAddedData';
import GetUsers from './Actions/GetUsers';
import DeleteUser from './Actions/DeleteUser';


const UserCreateTheme = makeStyles(theme => ({
    container: {
        margin: theme.spacing(5, 0),
    },
    content: {
        padding: theme.spacing(3),
    },
}));
const UserListTheme = makeStyles(theme => ({
  container: {
    margin: theme.spacing(3, 0),
  },
  content: {
    padding: theme.spacing(2),
  },

}))


export function UserList() {
    const userListClasses = UserListTheme()
    const handleDeleteUser = async id => await DeleteUser(id, users.token)(dispatchUser)
    const handleEditUser = id => console.log(id)
    const {
        userState: {
            users,
        },
        dispatchUser
    } = useContext(GlobalContext)

    useEffect(() => {
        GetUsers(users)(dispatchUser)
    }, [dispatchUser])
    
    return <>
        <Typography variant="h3" color="inherit" >
            Users List
        </Typography>
        {users.loading &&  <Paper className={userListClasses.content}>
           <LinearProgress className={userListClasses.container}/> 
        </Paper>}
        {users.data && <UserListLayout data={
            {
                users,
                dispatchUser,
                handleDeleteUser,
                handleEditUser
            }
        } />}

    </>
}

export function UserCreate() {
    const [snack, toggleSnack] = useToggle()
    const userCreateClasses = UserCreateTheme()
    const {
        userState: {
            users: {
                token
            },
            addUser: {
                data
            }
        },
        dispatchUser
    } = useContext(GlobalContext)

    useEffect(() => {
        GetToken(token)(dispatchUser)
    }, [dispatchUser, token])
    useEffect(() => {
        if (data) {
            toggleSnack()
            ClearAddedData()(dispatchUser)
        }
    }, [data, dispatchUser, toggleSnack])
    

    return <>
        <Typography variant="h3" color="inherit" >
            Create a new user
        </Typography>
        <Grid container spacing={2} className={userCreateClasses.container}>
            <Grid item md={2} />
            <Grid item md={8}>
                <Paper className={userCreateClasses.content}>
                    <UserCreateLayout form={useUserForm()} />
                </Paper>
            </Grid>
            <Grid item md={2} />
        </Grid>
        {snack && <SnackWithAction message="Enregistrement reussi!" to="/users" />}
    </>
}