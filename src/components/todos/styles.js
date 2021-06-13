import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    addButton: {
        border: '2px solid #000'
    },
    marginAuto: {
        display: 'flex',
        alignItems: "center",
        justifyContent: "center"
    }
}));