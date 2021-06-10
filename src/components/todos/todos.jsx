import React, { useState, useEffect } from 'react';
import { deleteTodo, getTodos } from '../../services/todoService'
import TodosTable from './todosTable';
import { Box, Typography, Button, IconButton } from '@material-ui/core';
import _ from 'lodash'
import { toast } from 'react-toastify'
import SimpleModal from '../common/modal';
import TodoItem from './todoitem'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    addButton: {
        border: '2px solid #000'
    }
}));
const TodoList = () => {
    const [todos, setTodos] = useState([])
    const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' })
    const classes = useStyles()

    useEffect(async () => {
        setTodos(await getTodos());
    }, [])

    const handleDelete = async (id) => {
        const originalTodos = todos;

        try {
            const filtered = todos.filter(m => m._id !== id)
            setTodos(filtered)
            await deleteTodo(id);
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                toast.error('the todo has already been deleted')
            setTodos(originalTodos)
        }

    }

    const handleChangeStatus = (todo) => {
        const newTodos = [...todos]
        const index = todos.indexOf(todo)
        newTodos[index] = { ...newTodos[index] }
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    }
    const handleSort = (sortColumn) => {
        setSortColumn(sortColumn)
    }


    if (todos.length === 0) return <p>There is no todo in the list</p>
    return (
        <>
            {/* <Typography variant="h4" color="primary">Todo List</Typography> */}

            <Box m={2}><SimpleModal title="Add Task" buttonStyle={{ border: '2px solid #000' }}><TodoItem /></SimpleModal></Box>


            <Box m={2} />
            <TodosTable todos={todos}
                onDelete={handleDelete}
                onChangeStatus={handleChangeStatus}
                onSort={handleSort}
                sortColumn={sortColumn} />
            <Box m={5}>
                <Button variant="outlined" color="primary">Completed</Button>
                <Button variant="outlined" color="secondary">UnCompleted</Button>
            </Box>
        </>
    )
}

export default TodoList
