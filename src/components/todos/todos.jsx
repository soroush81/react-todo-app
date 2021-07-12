import React, { useState, useEffect, useContext } from 'react';
import { Box, Hidden, Typography } from '@material-ui/core';
import Moment from 'moment';
import { toast } from 'react-toastify'
import AddIcon from '@material-ui/icons/Add';

import { deleteTodo, getTodos, saveTodo } from '../../services'
import { SimpleModal, TodoItem, TodosTable, RadioGroupList, ListGroup } from '../../components';
import UserContext from '../../context/userContext';

import { useStyles } from './styles';
import CategoryContext from './../../context/categoryContext';

const filterType = [
    { value: "all", label: "All" },
    { value: "completed", label: "Completed" },
    { value: "uncompleted", label: "Uncompleted" }
]

const TodoList = ({ history }) => {
    const user = useContext(UserContext)
    const categories = useContext(CategoryContext)
    const [allCategories, setAllCategories] = useState([{ id: "", name: 'All Categories' }, ...categories])
    const [todos, setTodos] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' })
    const [filterStatus, setFilterStatus] = useState('all')

    const classes = useStyles()
    let filtered = []

    const populateTodos = async (queryParam) => {
        user && setTodos(await getTodos(user.user_id, queryParam));
    }

    useEffect(() => {
        async function populateData() {
            await populateTodos(filterStatus)
        }
        populateData();
    }, [])

    useEffect(() => {
        const queryParam = new URLSearchParams(window.location.search).get('filter')
        if (queryParam)
            setFilterStatus(queryParam)
    })

    useEffect(() => {
        setAllCategories([{ id: "", name: 'All Categories' }, ...categories])
        filtered = getFilteredData(filterStatus)
    }, [filterStatus, categories])

    const handleDelete = async (id) => {
        const originalTodos = todos;

        try {
            const deleted = todos.filter(m => m.id !== id)
            setTodos(deleted)
            await deleteTodo(id);
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                toast.error('the todo has already been deleted')
            setTodos(originalTodos)
        }
    }

    const handleChangeStatus = async (todo, user) => {
        const newTodos = [...todos]
        const index = todos.indexOf(todo)
        newTodos[index] = { ...newTodos[index] }
        newTodos[index].completed = !newTodos[index].completed;
        newTodos[index].user = user
        setTodos(newTodos);
        await saveTodo(newTodos[index])
    }

    const handleChangeFilterStatus = (event) => {
        setFilterStatus(event.target.value)
    }
    const handleSort = (sortColumn) => {
        setSortColumn(sortColumn)
    }

    const handleCategorySelect = (category) => {
        history.replace('')
        setFilterStatus('all')
        setSelectedCategory(category)
    }

    const getFilteredTodos = (filter) => {
        const status = (filter === 'completed') ? true : false;
        filtered = (selectedCategory && selectedCategory.id !== "") ? filtered.filter(todo => todo.category.id === selectedCategory.id) : todos;
        filtered = (filter === 'all') ? filtered : filtered.filter(todo => todo.completed === status)
        return filtered
    }

    const getFilteredData = (filter) => {
        filtered = todos
        filtered = (filter === 'today') ? todos.filter(todo => todo.overdueDate === Moment(new Date()).format('YYYY-MM-DD')) : getFilteredTodos(filter)
        return filtered
    }

    filtered = getFilteredData(filterStatus);

    if (todos.length === 0) return (
        <>
            <Box m={2} className={classes.flexCenter}>
                <Typography variant="h6">There is no todo in the list</Typography>
                <SimpleModal title={<AddIcon />} onClose={() => populateTodos()} className={classes.mousePointer} > <TodoItem /></SimpleModal>
            </Box>
        </>);


    return (
        <>
            <Box display="flex" p={1}>
                <Hidden smDown>
                    <Box p={1} xs={2} style={{ width: '15%' }}>
                        <ListGroup title="Categories" items={allCategories} selectedItem={selectedCategory} onItemSelect={handleCategorySelect} />
                    </Box>
                </Hidden>
                <Box className={classes.marginAuto}>
                    <Box m={2}>
                        <TodosTable todos={filtered}
                            onDelete={handleDelete}
                            onChangeStatus={handleChangeStatus}
                            onSort={handleSort}
                            onClose={() => populateTodos()}
                            sortColumn={sortColumn}
                            user={user} />
                    </Box>
                    <Box m={2} className={classes.flexCenter}>
                        <RadioGroupList data={filterType} value={(filterStatus === 'today') ? 'all' : filterStatus} handleChange={handleChangeFilterStatus} />
                        <SimpleModal title={<AddIcon />} onClose={() => populateTodos()} className={classes.mousePointer} > <TodoItem user={user} /></SimpleModal>
                    </Box>
                </Box>
                <Box p={1} xs={2} style={{ width: '15%' }}>
                </Box>
            </Box>
        </>
    )
}

export default TodoList
