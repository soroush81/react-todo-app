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
        return Math.random() + item._id + (column.path || column.key);
    }

    return (
        <>
            <TableBody>
                {data.map(item => (
                    <TableRow key={item._id || Math.random()} className={classes.tableRow}>
                        {columns.map(col =>
                            <TableCell align="center" key={createKey(item, col)} style={{ padding: "0" }}>
                                {renderCell(item, col)}
                            </TableCell>)}
                    </TableRow>))}
            </TableBody>
        </>
    )
}
export default CustomTableBody;
