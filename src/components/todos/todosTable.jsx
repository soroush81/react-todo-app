import React from 'react'
import { IconButton, Checkbox } from '@material-ui/core';
import CustomTable from '../common/table'
import SimpleModal from '../common/modal'
import TodoItem from './todoitem'
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        backgroundColor: theme.palette.background.paper,
        margin: 'auto'
    },
}));

const TodosTable = ({ todos, onDelete, onChangeStatus, onSort, sortColumn }) => {
    const classes = useStyles();
    const titleStyle = (todo) => {
        return { textDecoration: todo.completed ? 'line-through' : 'none' }
    }
    const columns = [

        { path: "title", label: "Title", adminVisible: true, content: todo => <SimpleModal title={todo.title} buttonStyle={titleStyle(todo)} ><TodoItem todoitem={todo} /></SimpleModal> },
        { path: "completed", label: "Completed", adminVisible: true, content: todo => <Checkbox checked={todo.completed} onChange={() => onChangeStatus(todo)} /> },
        { key: "delete", adminVisible: true, content: todo => <IconButton variant="contained" color="secondary" onClick={() => onDelete(todo._id)}><DeleteIcon /></IconButton> }
    ];

    return (
        <>
            <CustomTable onSort={onSort} sortColumn={sortColumn} data={todos} columns={columns} cssClass={classes.root} />
        </>)
}

export default TodosTable
