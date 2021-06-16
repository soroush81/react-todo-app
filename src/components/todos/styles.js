import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
    root: {
        width: '370px',
        margin: 'auto'
    },
    listHeader:{
        backgroundColor: grey[500]
    },
    headerTitle:{
        color:'#fff',
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
    },
    titleColumnWidth:{
        width: '320px', 
        padding:0,
        margin:0
    },
    templateColumnWidth:{
        padding:0,
        margin:0
    }
}));

export const titleStyle = (todo) => {
    return { textDecoration: todo.completed ? 'line-through' : 'none' }
}