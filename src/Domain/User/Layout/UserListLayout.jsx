import { Grid, makeStyles, Paper } from "@material-ui/core";
import React, {useState} from "react";
import Dataviews from "../../../Components/Table/Dataviews";

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
      dispatchUser
    }
  }
) {
  const [filter, setFilter] = useState("")
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
          setPopupOpen={false}
          deleteItem={() => { }}
          editItem={() => {}}
        />
    </Grid>
  </Grid>
  </>
}

export default UserListLayout;
