import React from 'react'
import { Table, TableContainer, Paper } from '@material-ui/core';
import CustomTableHeader from './tableHeader'
import CustomTableBody from './tableBody'

const CustomTable = ({ onSort, columns, sortColumn, data, cssClass }) => {
    return (
        <>
            <Table aria-label="movies" className={cssClass}>
                <CustomTableHeader onSort={onSort} columns={columns} sortColumn={sortColumn} />
                <CustomTableBody data={data} columns={columns} />
            </Table>
        </>
    )
}

export default CustomTable;
