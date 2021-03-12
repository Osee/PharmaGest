import {
  makeStyles,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableSortLabel,
  Toolbar,
  TextField,
  InputAdornment,
  Button,
  Typography,
  Icon,
} from "@material-ui/core";
import { Search, Add, EditTwoTone, DeleteTwoTone } from "@material-ui/icons";
import React, { useState } from "react";

const useStyle = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(0, 0),
    padding: theme.spacing(2),
  },
  table: {
    minWidth: 650,
    width: "100%",
    marginTop: theme.spacing(3),
    "& tbody tr:hover": {
      background: "#eceff1",
      cursor: "pointer",
    },
    "& thead th": {
      background: "#ffa040",
      fontWeight: 600,
    },
    "& th:last-child": {
      textAlign: "center",
    },
  },
}));

const Dataviews = ({
  records,
  headerCells,
  filter,
  onChangeFilter,
  setPopupOpen,
  deleteItem,
  editItem,
}) => {
  const classes = useStyle();
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const tableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };
  const handleSortRequest = (cellid) => {
    const isAsc = orderBy === cellid && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(cellid);
  };
  const handlePageChange = (e, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };
  const handleFilter = (records, filter) => {
    let search = filter.toLocaleLowerCase();
    return search === ""
      ? records
      : records.filter((r) => r.username.toLocaleLowerCase().includes(search));
  };
  const recordsAfterPagingAndSorting = () =>
    tableSort(
      handleFilter(records, filter),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <Paper className={classes.container}>
      <Toolbar>
        <Typography
          variant="h6"
          color="initial"
          style={{ flex: 1, maxWidth: "75%", marginRight: "auto" }}
          component="div"
        >
          <TextField
            id="search"
            name="search"
            variant="outlined"
            label="Recherche"
            size="small"
            value={filter}
            onChange={onChangeFilter}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          startIcon={<Add />}
          onClick={() => setPopupOpen(true)}
        >
          ADD USER
        </Button>
      </Toolbar>
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {headerCells.map((headerCell) => (
                <TableCell
                  key={headerCell.id}
                  sortDirection={orderBy === headerCell.id ? order : false}
                >
                  {headerCell.disableSorting ? (
                    headerCell.label
                  ) : (
                    <TableSortLabel
                      active={orderBy === headerCell.id}
                      direction={orderBy === headerCell.id ? order : "asc"}
                      onClick={() => handleSortRequest(headerCell.id)}
                    >
                      {headerCell.label}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {recordsAfterPagingAndSorting().map((record) => (
              <TableRow key={record.username} selected={record.deleting}>
                <TableCell>{record.username}</TableCell>
                <TableCell>{record.level === 1 ? "Admin" : "User"}</TableCell>
                <TableCell>{record.created_at}</TableCell>
                <TableCell
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    color="default"
                    size="small"
                    startIcon={<EditTwoTone />}
                    onClick={() => editItem(record.id)}
                  >
                    EDIT
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<DeleteTwoTone />}
                    onClick={() => deleteItem(record.id)}
                    disabled={record.deleting}
                  >
                    SUPPRIMER
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        page={page}
        count={records.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleRowsPerPageChange}
      />
    </Paper>
  );
};

export default Dataviews;
