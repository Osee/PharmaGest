import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleAltTwoToneIcon from "@material-ui/icons/PeopleAltTwoTone";
import brand from "../../Assets/Img/fav.png";
import useToggle from "../../Hooks/useToggle";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Avatar, Button, Collapse, Divider, ListSubheader, Menu, MenuItem } from "@material-ui/core";
import FormatListBulletedTwoToneIcon from "@material-ui/icons/FormatListBulletedTwoTone";
import PersonAddTwoToneIcon from "@material-ui/icons/PersonAddTwoTone";
import ShoppingCartTwoToneIcon from "@material-ui/icons/ShoppingCartTwoTone";
import StorefrontTwoToneIcon from "@material-ui/icons/StorefrontTwoTone";
import AddShoppingCartTwoToneIcon from "@material-ui/icons/AddShoppingCartTwoTone";
import CategoryTwoToneIcon from "@material-ui/icons/CategoryTwoTone";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import RemoveShoppingCartTwoToneIcon from "@material-ui/icons/RemoveShoppingCartTwoTone";
import StoreTwoToneIcon from "@material-ui/icons/StoreTwoTone";
import AssessmentTwoToneIcon from "@material-ui/icons/AssessmentTwoTone";
import PublicTwoToneIcon from "@material-ui/icons/PublicTwoTone";
import DetailsTwoToneIcon from "@material-ui/icons/DetailsTwoTone";
import MonetizationOnTwoToneIcon from "@material-ui/icons/MonetizationOnTwoTone";
import { NavLink } from "react-router-dom"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: "auto",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        background: "#eeeeee",
        height: "100vh",
        overflowY: "auto"
    },
    brand: {
        width: 50,
        height: 50,
        padding: theme.spacing(1),
        background: theme.palette.background.paper,
        borderRadius: theme.spacing(5),
        margin: theme.spacing(0.7),
    },
    subMenus: {
        paddingLeft: theme.spacing(4),
    },
    subTitle: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        paddingRight: theme.spacing(2),
    },
    menuItem: {
        margin: theme.spacing(0, 1),
    },
    userLogoContainer: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: theme.spacing(9),
        padding: theme.spacing(3, 0),
    },
    userLogo: {
        width: 100,
        height: 100,
    },
    link: {
        textDecoration: "none",
        color: "inherit"
    }
}));

const Panel = ({ children, userLogged }) => {
    console.log(userLogged);
    const [linkText, setLinkText] = useState("");
    const [productOpen, toggleProductOpen] = useToggle();
    const [categoryOpen, toggleCategoryOpen] = useToggle();
    const [formOpen, toggleFormOpen] = useToggle();
    const [inventoryOpen, toggleInventoryOpen] = useToggle();
    const [userOpen, toggleUserOpen] = useToggle();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenProfilMenu = (e) => setAnchorEl(e.currentTarget);
    const handleCloseProfilMenu = () => setAnchorEl(null);

    const handleProduct = () => toggleProductOpen();
    const handleCategory = () => toggleCategoryOpen();
    const handleUser = () => toggleUserOpen();
    const handleForm = () => toggleFormOpen();
    const handleInventory = () => toggleInventoryOpen();

    const handleActiveLink = (e) => setLinkText(e.target.innerText);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar} color="primary">
                <Toolbar>
                    <Typography variant="caption" noWrap className={classes.brand}>
                        <img
                            src={brand}
                            title="Icon Site"
                            alt="Logo du site"
                            style={{ maxWidth: "100%" }}
                        />
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar className={classes.userLogoContainer}>
                    <Avatar
                        className={classes.userLogo}
                        alt="Logo user"
                        src="https://webstockreview.net/images/512x512-png-images-5.png"
                    />
                    <div>
                        <Button onClick={handleOpenProfilMenu}>
                            {userLogged.username}
                        </Button>
                        <Menu
                            id="Profil-Menus"
                            open={Boolean(anchorEl)}
                            onClose={handleCloseProfilMenu}
                            anchorEl={anchorEl}
                            keepMounted
                            className={classes.profilMenus}
                        >
                            <MenuItem onClick={handleCloseProfilMenu}>Profil</MenuItem>
                            <MenuItem onClick={handleCloseProfilMenu}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>

                <Divider />
                <div className={classes.drawerContainer}>
                    <List
                        id="shop"
                        key="shop"
                        component="nav"
                        aria-labelledby="Shop"
                        subheader={<ListSubheader component="div">Shop </ListSubheader>}
                        className={classes.subTitle}
                    >
                        <NavLink className={classes.link} to="/sell">
                            <ListItem
                                button
                                onClick={handleActiveLink}
                                className={classes.menuItem}
                                selected={linkText === "Sell" ? true : false}
                            >
                                <ListItemIcon>
                                    <StorefrontTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText primary="Sell" />
                            </ListItem>
                        </NavLink>
                    </List>;
                    {userLogged.level === 1 && <> <List
                        id="report"
                        key="report"
                        component="nav"
                        aria-labelledby="Reports"
                        subheader={<ListSubheader component="div">Reports </ListSubheader>}
                        className={classes.subTitle}
                    >
                        <ListItem
                            button
                            onClick={handleInventory}
                            className={classes.menuItem}
                        >
                            <ListItemIcon>
                                <AssessmentTwoToneIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inventory" />
                            {inventoryOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={inventoryOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem
                                    button
                                    className={classes.subMenus}
                                    onClick={handleActiveLink}
                                    selected={linkText === "Global" ? true : false}
                                >
                                    <ListItemIcon>
                                        <PublicTwoToneIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Global" />
                                </ListItem>
                                <ListItem
                                    button
                                    className={classes.subMenus}
                                    onClick={handleActiveLink}
                                    selected={linkText === "Detail" ? true : false}
                                >
                                    <ListItemIcon>
                                        <DetailsTwoToneIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Detail" />
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                        <List
                            id="store"
                            key="store"
                            component="nav"
                            aria-labelledby="Store"
                            subheader={<ListSubheader component="div"> Store </ListSubheader>}
                            className={classes.subTitle}
                        >
                            <ListItem
                                button
                                onClick={handleProduct}
                                className={classes.menuItem}
                            >
                                <ListItemIcon>
                                    <ShoppingCartTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText primary="Products" />
                                {productOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={productOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem
                                        button
                                        className={classes.subMenus}
                                        onClick={handleActiveLink}
                                        selected={linkText === "List Products" ? true : false}
                                    >
                                        <ListItemIcon>
                                            <FormatListBulletedTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="List Products" />
                                    </ListItem>
                                    <ListItem
                                        button
                                        className={classes.subMenus}
                                        onClick={handleActiveLink}
                                        selected={linkText === "Expired Prod." ? true : false}
                                    >
                                        <ListItemIcon>
                                            <RemoveShoppingCartTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Expired Prod." />
                                    </ListItem>
                                    <ListItem
                                        button
                                        className={classes.subMenus}
                                        onClick={handleActiveLink}
                                        selected={linkText === "Add Product" ? true : false}
                                    >
                                        <ListItemIcon>
                                            <AddShoppingCartTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Add Product" />
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem button onClick={handleForm} className={classes.menuItem}>
                                <ListItemIcon>
                                    <CategoryTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText primary="Forms" />
                                {formOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={formOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem
                                        button
                                        className={classes.subMenus}
                                        onClick={handleActiveLink}
                                        selected={linkText === "List Forms" ? true : false}
                                    >
                                        <ListItemIcon>
                                            <FormatListBulletedTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="List Forms" />
                                    </ListItem>
                                    <ListItem
                                        button
                                        className={classes.subMenus}
                                        onClick={handleActiveLink}
                                        selected={linkText === "Add Form" ? true : false}
                                    >
                                        <ListItemIcon>
                                            <AddCircleTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Add Form" />
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem
                                button
                                onClick={handleCategory}
                                className={classes.menuItem}
                            >
                                <ListItemIcon>
                                    <CategoryTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText primary="Categories" />
                                {categoryOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={categoryOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem
                                        button
                                        className={classes.subMenus}
                                        onClick={handleActiveLink}
                                        selected={linkText === "List Categories" ? true : false}
                                    >
                                        <ListItemIcon>
                                            <FormatListBulletedTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="List Categ." />
                                    </ListItem>
                                    <ListItem
                                        button
                                        className={classes.subMenus}
                                        onClick={handleActiveLink}
                                        selected={linkText === "Add Category" ? true : false}
                                    >
                                        <ListItemIcon>
                                            <AddCircleTwoToneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Add Category" />
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem
                                button
                                className={classes.menuItem}
                                onClick={handleActiveLink}
                                selected={linkText === "Depot" ? true : false}
                            >
                                <ListItemIcon>
                                    <StoreTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText primary="Depot" />
                            </ListItem>
                        </List>
                        <List
                            id="management"
                            key="management"
                            component="nav"
                            aria-labelledby="Management"
                            subheader={
                                <ListSubheader component="div"> Management </ListSubheader>
                            }
                            className={classes.subTitle}
                        >
                            <ListItem button onClick={handleUser} className={classes.menuItem}>
                                <ListItemIcon>
                                    <PeopleAltTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText primary="Users" />
                                {userOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={userOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <NavLink className={classes.link} to="/users">
                                        <ListItem
                                            button
                                            className={classes.subMenus}
                                            onClick={handleActiveLink}
                                            selected={linkText === "List Users" ? true : false}
                                        >
                                            <ListItemIcon>
                                                <FormatListBulletedTwoToneIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="List Users" />
                                        </ListItem>
                                    </NavLink>
                                    <NavLink className={classes.link} to="/users/create" >
                                        <ListItem
                                            button
                                            className={classes.subMenus}
                                            onClick={handleActiveLink}
                                            selected={linkText === "Add User" ? true : false}
                                        >
                                            <ListItemIcon>
                                                <PersonAddTwoToneIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Add User" />
                                        </ListItem>
                                    </NavLink>
                                </List>
                            </Collapse>
                        </List>
                        <List
                            id="cash"
                            key="cash"
                            component="nav"
                            aria-labelledby="Cash-Register"
                            subheader={
                                <ListSubheader component="div">Cash Register </ListSubheader>
                            }
                            className={classes.subTitle}
                        >
                            <ListItem
                                button
                                onClick={handleActiveLink}
                                selected={linkText === "Cash Register" ? true : false}
                                className={classes.menuItem}
                            >
                                <ListItemIcon>
                                    <MonetizationOnTwoToneIcon />
                                </ListItemIcon>
                                <ListItemText primary="Cash Register" />
                            </ListItem>
                        </List> </>}
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar />
                {children}
            </main>
        </div>
    );
}

export default Panel
