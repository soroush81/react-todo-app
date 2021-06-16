import React from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import { Hidden, IconButton, Menu, MenuItem, Box } from '@material-ui/core'
import { Link, NavLink } from 'react-router-dom';

const AppMenu = ({ user }) => {
    const navLinkStyle =
    {
        textDecoration: "none",
        padding: 20,
        color: 'white'
    }

    const activeNavLinkStyle = {
        background: 'orange',
        color: 'blue'
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Box>
                <Hidden xsDown >
                    {!user &&
                        <>
                            <NavLink to="/login" style={navLinkStyle} activeStyle={activeNavLinkStyle} >Login</NavLink>
                            <NavLink to="/register" style={navLinkStyle} activeStyle={activeNavLinkStyle} >SignUp</NavLink>
                        </>
                    }
                    {user &&
                        <>
                            <NavLink to="/profile" style={navLinkStyle} activeStyle={activeNavLinkStyle} >{user.name}</NavLink>
                            <NavLink to="/logout" style={navLinkStyle} activeStyle={activeNavLinkStyle} >Logout</NavLink>
                        </>}
                </Hidden>
            </Box>
            <Hidden smUp>
                <IconButton onClick={handleClick} edge="start" color="inherit" aria-label="menu" aria-controls="simple-menu" aria-haspopup="true">
                    <MenuIcon />
                </IconButton>
            </Hidden>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            > {!user &&
                <>
                    <MenuItem onClick={handleClose} component={Link} to="/login" style={{ width: "150px" }}>Login</MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/register">SignUp</MenuItem>
                </>}
                {user &&
                    <>
                        <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/logout">Logout</MenuItem>
                    </>}
            </Menu>
        </>
    )
}

export default AppMenu
