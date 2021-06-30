import React from 'react'
import { IconButton, Checkbox, Typography, Box } from '@material-ui/core';
import CustomTable from '../common/table'
import SimpleModal from '../common/modal'
import TodoItem from './todoitem'
import DeleteIcon from '@material-ui/icons/Delete'
import { useStyles, titleStyle } from './styles';

const TodosTable = ({ todos, onDelete, onChangeStatus, onSort, onClose, sortColumn, user }) => {
    const classes = useStyles();

    const getTitle = (todo) => {
        return (
            <Box className={classes.todoTitle}>
                <Typography variant="caption" style={{ textAlign: 'center' }}>{todo.title}</Typography>
                <Typography variant="caption" color="primary" style={{ fontSize: '0.5rem', fontStyle: 'italic', margin: '0' }}>{todo.overdueDate}</Typography>

            </Box>)
    }


    const columns = [
        { path: "title", adminVisible: true, style: classes.titleColumnWidth, content: todo => <SimpleModal title={getTitle(todo)} buttonStyle={titleStyle(todo)} onClose={onClose} ><TodoItem todoitem={todo} user={user} /></SimpleModal> },
        { path: "completed", adminVisible: true, style: classes.templateColumnWidth, content: todo => <Checkbox checked={todo.completed} onChange={() => onChangeStatus(todo)} /> },
        { key: "delete", adminVisible: true, style: classes.templateColumnWidth, content: todo => <IconButton variant="contained" color="secondary" onClick={() => onDelete(todo.id)}><DeleteIcon /></IconButton> }
    ];

    return (
        <>
            <CustomTable onSort={onSort} sortColumn={sortColumn} data={todos} columns={columns} title="TODO LIST" cssClasses={classes} />
        </>)
}

export default TodosTable
