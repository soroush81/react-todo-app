import React, { useState, useEffect, useContext } from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { Paper, Grid, Button, TextField } from '@material-ui/core';
import Joi from 'joi-browser';
import { getTodo, saveTodo } from '../../services'
import { FormInput, FormSelect } from '../../components'
import { validate, validateField } from '../../hooks/useValidate'
import UserContext from '../../context/userContext';
import { useStyles } from './styles';
import CategoryContext from './../../context/categoryContext';

const TodoItem = ({ todoitem, handleClose }) => {
    const currentUser = useContext(UserContext)
    const categories = useContext(CategoryContext)

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

    useEffect(() => {
        async function populateData() {
            const todoId = todoitem.id;
            if (todoId === "new") return;
            mapToViewModel(await getTodo(todoId));
        }
        populateData();
    }, []);

    const changeHandler = ({ target: input }, path) => {
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
        const index = categories.findIndex(c => c.id === todo.categoryId)
        newTodo = { ...newTodo, category: categories[index], user: currentUser }
        await saveTodo(newTodo);
        handleClose();
    }

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
                                onChange={e => changeHandler(e, 'title')}
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
                                onChange={(e) => changeHandler(e, 'categoryId')}
                                required
                                size={12} />
                            <Grid item xs={12}>
                                <TextField
                                    name="overdueDate"
                                    label="overdueDate"
                                    type="date"
                                    value={todo.overdueDate}
                                    onChange={e => changeHandler(e, 'overdueDate')}
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