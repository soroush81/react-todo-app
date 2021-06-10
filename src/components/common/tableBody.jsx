import React from 'react'
import _ from 'lodash'
import { TableCell, TableRow, TableBody } from '@material-ui/core';
const CustomTableBody = ({ data, columns }) => {
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
                    <TableRow key={item._id || Math.random()}>
                        {columns.map(col =>
                            <TableCell align="center" key={createKey(item, col)}>
                                {renderCell(item, col)}
                            </TableCell>)}
                    </TableRow>))}
            </TableBody>
        </>
    )
}
export default CustomTableBody;
