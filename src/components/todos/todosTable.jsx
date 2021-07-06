import React, { useContext } from 'react'
import { IconButton, Checkbox, Typography, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { CustomTable, SimpleModal, TodoItem } from '../../components'
import UserContext from './../../context/userContext';
import { useStyles, titleStyle } from './styles';

const TodosTable = ({ todos, onDelete, onChangeStatus, onSort, onClose, sortColumn }) => {
    const classes = useStyles();
    const currentUser = useContext(UserContext)

    const getTitle = (todo) => {
        return (
            <Box className={classes.todoTitle}>
                <Typography variant="caption" className="center">{todo.title}</Typography>
                <Typography variant="caption" color="primary" className={classes.date}>{todo.overdueDate}</Typography>
            </Box>)
    }


    const columns = [
        { path: "title", adminVisible: true, style: classes.titleColumnWidth, content: todo => <SimpleModal title={getTitle(todo)} buttonStyle={titleStyle(todo)} onClose={onClose} ><TodoItem todoitem={todo} /></SimpleModal> },
        { path: "completed", adminVisible: true, style: classes.templateColumnWidth, content: todo => <Checkbox checked={todo.completed} onChange={() => onChangeStatus(todo, currentUser)} /> },
        { key: "delete", adminVisible: true, style: classes.templateColumnWidth, content: todo => <IconButton variant="contained" color="secondary" onClick={() => onDelete(todo.id)}><DeleteIcon /></IconButton> }
    ];

    return (
        <>
            <CustomTable onSort={onSort} sortColumn={sortColumn} data={todos} columns={columns} title="TODO LIST" cssClasses={classes} />
        </>)
}

export default TodosTable
