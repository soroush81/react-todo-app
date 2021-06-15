import React from 'react'
import { IconButton, Checkbox } from '@material-ui/core';
import CustomTable from '../common/table'
import SimpleModal from '../common/modal'
import TodoItem from './todoitem'
import DeleteIcon from '@material-ui/icons/Delete'
import { useStyles, titleStyle } from './styles';

const TodosTable = ({ todos, onDelete, onChangeStatus, onSort, onClose, sortColumn }) => {
    const classes = useStyles();

    const columns = [
        { path: "title", adminVisible: true, content: todo => <SimpleModal title={todo.title} buttonStyle={titleStyle(todo)} onClose={onClose} ><TodoItem todoitem={todo} /></SimpleModal> },
        { path: "completed", adminVisible: true, content: todo => <Checkbox checked={todo.completed} onChange={() => onChangeStatus(todo)} /> },
        { key: "delete", adminVisible: true, content: todo => <IconButton variant="contained" color="secondary" onClick={() => onDelete(todo._id)}><DeleteIcon /></IconButton> }
    ];
    if (todos.length === 0) return <p>There is no todo in the list</p>

    return (
        <>
            <CustomTable onSort={onSort} sortColumn={sortColumn} data={todos} columns={columns} title="TO-DO LIST" cssClasses={classes} />
        </>)
}

export default TodosTable
