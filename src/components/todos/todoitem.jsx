import React, { useState, useEffect } from 'react'
import { getTodo, saveTodo } from '../../services/todoService'
import { Paper, Grid, Button } from '@material-ui/core';
import FormInput from '../common/formInput'
import FormSelect from '../common/formSelect'
import { useForm, FormProvider } from 'react-hook-form';
import Joi from 'joi-browser';
import { validate, validateField } from '../../hooks/useValidate'
import { useStyles } from './styles';
import { getCategories } from '../../services/categoryService'
import { getUser } from '../../services/userService';


const TodoItem = ({ todoitem, handleClose, user }) => {
    const currentUser = { id: '1', first_name: 'soodeh', username: 'sebrahimi60@yahoo.com', password: '123456' }
    const [categories, setCategories] = useState([])
    const [todo, setTodo] = useState({ id: '', title: '', categoryId: 5, description: 'description', completed: false, userId: currentUser.id })
    const [errors, setErrors] = useState([]);
    const methods = useForm();
    const classes = useStyles()

    const schema = {
        id: Joi.number().allow(''),
        title: Joi.string().required().label('Title'),
        categoryId: Joi.number().required().label('Category'),
        description: Joi.string().label('Description'),
        completed: Joi.boolean().required().label('Completed'),
        userId: Joi.number().label('User')
    }
    const mapToViewModel = (m) => {
        setTodo({
            id: m.id,
            title: m.title,
            categoryId: m.category.id,
            description: m.description,
            completed: m.completed,
            userId: currentUser.id
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
        console.log(user)
        //const { data } = await getUser(user.id)
        // currentUser.id = data.data['id']
        // currentUser.username = data.data['username']
        // currentUser.first_name = data.data['first_name']
        // currentUser.password = data.data['password']

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