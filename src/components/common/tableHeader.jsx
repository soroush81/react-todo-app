import React from 'react'
import { TableCell, TableRow, TableHead, Typography, TextareaAutosize } from '@material-ui/core';
const TableHeader = ({ cssClass, title }) => {
    return (
        <>
            <TableHead>
                <TableRow className={cssClass.header}>
                    <TableCell colSpan={3} className={cssClass.center}>
                        <Typography variant="h6" className={cssClass.headerTitle}>{title}</Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
        </>
    )
}

export default TableHeader
