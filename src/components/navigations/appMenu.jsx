import React from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import { Hidden, IconButton, Menu, MenuItem, Box } from '@material-ui/core'
import { Link, NavLink } from 'react-router-dom';
import { useStyles } from './style'
const AppMenu = ({ user }) => {

    const classes = useStyles();
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
                            <NavLink to="/login" className={classes.navLinkStyle} activeClassName={classes.activeNavLinkStyle} >Login</NavLink>
                            <NavLink to="/register" className={classes.navLinkStyle} activeClassName={classes.activeNavLinkStyle} >SignUp</NavLink>
                        </>
                    }
                    {user &&
                        <>
                            <NavLink to="/todos?filter=today" className={classes.navLinkStyle} activeClassName={classes.activeNavLinkStyle} >Today</NavLink>
                            <NavLink to="/profile" className={classes.navLinkStyle} activeClassName={classes.activeNavLinkStyle} >{user.name}</NavLink>
                            <NavLink to="/logout" className={classes.navLinkStyle} activeClassName={classes.activeNavLinkStyle} >Logout</NavLink>
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
                <Box>
                    <MenuItem onClick={handleClose} component={Link} to="/login" style={{ width: "150px" }}>Login</MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/register">SignUp</MenuItem>
                </Box>}
                {user &&
                    <Box>
                        <MenuItem onClick={handleClose} component={Link} to="/todos?filter:today">Today</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/logout">Logout</MenuItem>
                    </Box>}
            </Menu>
        </>
    )
}

export default AppMenu
