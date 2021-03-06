import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
    root: {
        width: '370px',
        margin: 'auto'
    },
    listHeader: {
        backgroundColor: grey[500]
    },
    headerTitle: {
        color: '#fff',
    },
    flexCenter: {
        display: 'flex',
        justifyContent: "center"
    },
    marginAuto: {
        margin: '0 auto'
    },
    center: {
        textAlign: 'center'
    },
    fullWidth: {
        width: '100%'
    },
    mousePointer: {
        cursor: 'pointer'
    },
    titleColumnWidth: {
        width: '320px',
        padding: 0,
        margin: 0
    },
    templateColumnWidth: {
        padding: 0,
        margin: 0
    },
    todoTitle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      }
}));

export const titleStyle = (todo) => {
    return { textDecoration: todo.completed ? 'line-through' : 'none' }
}