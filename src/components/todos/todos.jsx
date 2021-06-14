import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@material-ui/core';
import { toast } from 'react-toastify'
import AddIcon from '@material-ui/icons/Add';

import { deleteTodo, getTodos } from '../../services/todoService'
import SimpleModal from '../common/modal';
import TodosTable from './todosTable';
import TodoItem from './todoitem';
import RadioGroupList from '../common/radioGroup';
import { useStyles } from './styles';


const filterType = [
    { value: "all", label: "All" },
    { value: "completed", label: "Completed" },
    { value: "uncompleted", label: "Uncompleted" }
]
const TodoList = () => {
    const [todos, setTodos] = useState([])
    const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' })
    const [filterStatus, setFilterStatus] = useState({ status: 'all' })

    const classes = useStyles()
    let filtered = []

    useEffect(async () => {
        await populateTodos()
    }, [])

    const populateTodos = async () => {
        setTodos(await getTodos());
    }

    useEffect(() => {
        filtered = getFilteredData(filterStatus)
    }, [filterStatus])

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

    const handleChangeFilterStatus = (event) => {
        setFilterStatus(event.target.value)
    }
    const handleSort = (sortColumn) => {
        setSortColumn(sortColumn)
    }

    const getFilteredData = (filter) => {
        const status = (filter === 'completed') ? true : false;
        filtered = (filter === 'all') ? todos : todos.filter(todo => todo.completed == status)
        return filtered
    }

    const addButton = <IconButton aria-label="add task"><AddIcon /></IconButton>

    filtered = getFilteredData(filterStatus);

    if (todos.length === 0) return <p>There is no todo in the list</p>
    return (
        <>
            <Box m={2}><Typography variant="h6" color="primary">TaskList</Typography></Box>
            <TodosTable todos={filtered}
                onDelete={handleDelete}
                onChangeStatus={handleChangeStatus}
                onSort={handleSort}
                onClose={populateTodos}
                sortColumn={sortColumn} />
            <Box m={2} className={classes.marginAuto}>
                <RadioGroupList data={filterType} value={filterStatus} handleChange={handleChangeFilterStatus} />
                <SimpleModal title={addButton} onClose={populateTodos} > <TodoItem /></SimpleModal>
            </Box>
        </>
    )
}

export default TodoList
