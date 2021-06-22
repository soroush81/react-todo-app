import React from 'react'
import _ from 'lodash'
import { TableCell, TableRow, TableBody } from '@material-ui/core';
import { useStyles } from './tableStyle'
const CustomTableBody = ({ data, columns }) => {

    const classes = useStyles();

    const renderCell = (item, column) => {
        const contentColumn = column.content && (column.adminVisible || column.userVisible)
        if (contentColumn) return column.content(item);
        return _.get(item, column.path);
    }

    const createKey = (item, column) => {
        return Math.random() + item.id + (column.path || column.key);
    }

    const getColumnStyle = (column) => {
        return (column.style) ? column.style : "";
    }

    return (
        <>
            <TableBody>
                {data.map(item => (
                    <TableRow key={item.id || Math.random()} className={classes.tableRow}>
                        {columns.map(col =>
                            <TableCell align="left" key={createKey(item, col)} className={getColumnStyle(col)}>
                                {renderCell(item, col)}
                            </TableCell>)}
                    </TableRow>))}
            </TableBody>
        </>
    )
}
export default CustomTableBody;
