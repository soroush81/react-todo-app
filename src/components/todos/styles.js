import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
    root: {
        width: 400,
        margin: 'auto'
    },
    header:{
        backgroundColor: grey[500]
    },
    headerTitle:{
        color:'#fff',
    },
    addButton: {
        border: '2px solid #000'
    },
    marginAuto: {
        display: 'flex',
        justifyContent: "center"
    },
    center:{
        textAlign:'center'
    },
    fullWidth:{ 
        width: '100%'
    },
    mousePointer:{
        cursor: 'pointer'
    }
}));

export const titleStyle = (todo) => {
    return { textDecoration: todo.completed ? 'line-through' : 'none' }
}