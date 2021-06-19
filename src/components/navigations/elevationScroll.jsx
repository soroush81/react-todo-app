import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Toolbar, AppBar, CssBaseline, useScrollTrigger, Box, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AppMenu from './appMenu'
import { useStyles } from './style'
function ElevationScroll(props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

export default function ElevateAppBar(props) {
    const classes = useStyles()

    return (
        <>
            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h5"><Link to="/" className={classes.logoStyle}>
                            TODO APP
                        </Link></Typography>
                        <AppMenu user={props.user} />
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
            <Container>
                <Box my={2}>
                </Box>
            </Container>
        </>
    );
}
