import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    logoStyle: {
        textDecoration: "none",
        padding: 20,
        color: 'white'
    },
    navLinkStyle: {
        textDecoration: "none",
        padding: 20,
        color: 'white'
    },
    activeNavLinkStyle: {
        background: 'orange',
        color: 'blue'
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    }


}))