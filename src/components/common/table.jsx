import React from 'react'
import { Table } from '@material-ui/core';
import CustomTableHeader from './tableHeader'
import CustomTableBody from './tableBody'

const CustomTable = ({ title, columns, data, cssClasses }) => {
    return (
        <>
            <Table aria-label="data" className={cssClasses.root}>
                <CustomTableHeader cssClass={cssClasses} title={title} />
                <CustomTableBody data={data} columns={columns} />
            </Table>
        </>
    )
}

export default CustomTable;
