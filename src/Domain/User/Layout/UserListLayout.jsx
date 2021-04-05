import { Grid, makeStyles, Paper } from "@material-ui/core";
import React, {useState} from "react";
import Popup from "../../../Components/Popup/Popup";
import Dataviews from "../../../Components/Table/Dataviews";
import useToggle from "../../../Hooks/useToggle";
import useUserForm from "../Hooks/useUserForm";
import { UserCreateLayout, UserEditLayout } from "./UserFormLayout";

const UserListTheme = makeStyles(theme => ({
  container : {
    margin : theme.spacing(5,0)
  },
  content: {
    padding : theme.spacing(2)
  }

}))
const headCells = [
  { id: "username", label: "USERNAME" },
  { id: "level", label: "ROLE" },
  { id: "created_at", label: "CREATED" },
  { id: "action", label: "ACTIONS", disableSorting: true },
];

function UserListLayout(
  {
    data: {
      users: {
        loading: usersLoading,
        data: usersData,
        token
      },
      dispatchUser,
      handleDeleteUser,
      handleEditUser,
    }
  }
) {
  const [filter, setFilter] = useState("")
  const [popupAddUser, toggleAddUser] = useToggle()
  const [editMode, toggleEditMode] = useToggle()
  const EditUser = e => {
    toggleEditMode()
    handleEditUser(e)
  }
  
  const userListClasses = UserListTheme()

  const handleFilterChange = e => setFilter(e.target.value)
  return <>
  <Grid container spacing={1} className={userListClasses.container}>
      <Grid item md={12}>
        <Dataviews
          headerCells={headCells}
          records={usersData}
          filter={filter}
          onChangeFilter={handleFilterChange}
          setPopupOpen={toggleAddUser || editMode}
          deleteItem={handleDeleteUser}
          editItem={EditUser}
          buttonTitle="ADD USER"
        />
        <Popup
          title="CREATE AN USER"
          popupOpen={ popupAddUser}
          togglePopup={toggleAddUser}
        >
          <UserCreateLayout form={useUserForm()}/>
        </Popup>
        
        <Popup
          title="EDIT USER"
          popupOpen={editMode}
          togglePopup={toggleEditMode}
        >
          <UserEditLayout form={useUserForm({})} editMode={editMode}/>
        </Popup>
    </Grid>
  </Grid>
  </>
}

export default UserListLayout;
