import React, { useState, useEffect, useContext } from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { Paper, Grid, Button, TextField } from '@material-ui/core';
import Joi from 'joi-browser';
import { getTodo, saveTodo, getCategories } from '../../services'
import { FormInput, FormSelect } from '../../components'
import { validate, validateField } from '../../hooks/useValidate'
import UserContext from '../../context/userContext';
import { useStyles } from './styles';

const TodoItem = ({ todoitem, handleClose }) => {
    const currentUser = useContext(UserContext)
    const [categories, setCategories] = useState([])
    const [todo, setTodo] = useState({ id: '', title: '', categoryId: 5, description: 'description', completed: false, userId: currentUser.id, overdueDate: new Date() })
    const [errors, setErrors] = useState([]);
    const methods = useForm();
    const classes = useStyles()

    const schema = {
        id: Joi.number().allow(''),
        title: Joi.string().required().label('Title'),
        categoryId: Joi.number().required().label('Category'),
        description: Joi.string().label('Description'),
        completed: Joi.boolean().required().label('Completed'),
        userId: Joi.number().label('User'),
        overdueDate: Joi.string().label('OverdueDate')
    }
    const mapToViewModel = (m) => {
        setTodo({
            id: m.id,
            title: m.title,
            categoryId: m.category.id,
            description: m.description,
            completed: m.completed,
            overdueDate: m.overdueDate,
            userId: currentUser.id,
        })
    }

    const populateTodo = async () => {
        try {
            const todoId = todoitem.id;
            if (todoId === "new") return;
            const _todo = await getTodo(todoId);
            _todo['userId'] = currentUser.id
            mapToViewModel(_todo);
        }
        catch (ex) {
        }
    }

    const populateCategories = async () => {
        setCategories(await getCategories());
    }

    useEffect(async () => {
        await populateTodo();
        await populateCategories();
    }, []);

    const changeHandler = ({ target: input }) => {
        setErrors(validateField(input, schema, errors));
        const newTodo = { ...todo };
        newTodo[input.name] = input.value;
        setTodo(newTodo);
    }

    const selectHandler = ({ target: input }, path) => {
        setErrors(validateField(input, schema, errors));
        const newTodo = { ...todo };
        newTodo[path] = input.value;
        setTodo(newTodo);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(todo, schema));
        if (errors && Object.keys(errors).length !== 0) {
            return;
        }
        doSubmit();
    };

    const doSubmit = async () => {
        let newTodo = { ...todo }
        delete newTodo.categoryId
        delete newTodo.userId
        const index = categories.findIndex(c => c.id === todo.categoryId)
        newTodo = { ...newTodo, category: categories[index], user: currentUser }
        await saveTodo(newTodo);
        handleClose();
    }

    console.log('a')
    console.log(todo.overdueDate)

    return (
        <>
            <FormProvider {...methods}>
                <form className={classes.flexCenter} onSubmit={(e) => handleSubmit(e, doSubmit)} noValidate>
                    <Paper variant="outlined" className={classes.fullWidth}>
                        <Grid container className={classes.flexCenter} spacing={2}>
                            <FormInput
                                name='title'
                                label='Title'
                                value={todo.title}
                                onChange={changeHandler}
                                required
                                size={12}
                                autoFocus={true}
                                error={errors && errors['title']} />
                            <FormSelect
                                id='categoryId'
                                label='Category'
                                items={categories}
                                labelId='categorySelectLabel'
                                selectedId={todo.categoryId}
                                onChange={(e) => selectHandler(e, 'categoryId')}
                                required
                                size={12} />
                            <Grid item xs={12}>
                                <TextField
                                    name="overdueDate"
                                    label="overdueDate"
                                    type="date"
                                    value={todo.overdueDate}
                                    onChange={changeHandler}
                                    defaultValue="2021-05-24"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }} />
                            </Grid>
                            <Grid item >
                                <Button variant="contained" color="primary" type="submit" disabled={validate(todo, schema)}>Save</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            </FormProvider>
        </>
    )
}

export default TodoItem