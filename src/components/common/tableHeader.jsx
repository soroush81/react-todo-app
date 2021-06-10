import React from 'react'
import { TableCell, TableRow, TableHead } from '@material-ui/core';
const TableHeader = ({ columns, onSort, sortColumn }) => {

    const raiseSort = (path) => {
        const _sortColumn = { ...sortColumn }
        if (_sortColumn.path === path)
            _sortColumn.order = _sortColumn.order === 'asc' ? 'desc' : 'asc';
        else {
            _sortColumn.path = path
            _sortColumn.order = 'asc'
        }
        onSort(_sortColumn)
    }

    const renderSortIcon = column => {
        if (sortColumn.path !== column.path) return null;
        if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc"></i>
        return <i className="fa fa-sort-desc"></i>
    }
    return (
        <>
            <TableHead>
                <TableRow>
                    {
                        columns.map(col => (
                            <TableCell
                                style={col.styleClass}
                                key={col.path || col.key}
                                onClick={() => raiseSort(col.path)}
                                style={{ fontWeight: 800, cursor: 'pointer' }}
                                align="center">{col.label} {renderSortIcon(col)}</TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
        </>
    )
}

export default TableHeader
