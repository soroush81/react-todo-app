import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
    tableRow:{
        '&:nth-of-type(even)': {
            backgroundColor: grey[200],
          }
    },
}));
