import React, { useEffect, useContext, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Grid, makeStyles, Paper } from "@material-ui/core"
import useToggle from '../../Hooks/useToggle';
import { GlobalContext } from '../../Context/Provider';
import GetToken from './Actions/GetToken';
import UserCreateLayout from './Layout/UserCreateLayout';
import useUserForm from './Hooks/useUserForm';


const UserCreateTheme = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(5, 0),
    },
    content: {
        padding: theme.spacing(3),
    },
}));


export function UserList() {
    return <div>C'est la liste des utlisateurs</div>
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
    </>
}