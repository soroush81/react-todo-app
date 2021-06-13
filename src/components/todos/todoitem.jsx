import React, { useState, useEffect } from 'react'
import { getTodo, saveTodo } from '../../services/todoService'
import { Paper, Grid, Button } from '@material-ui/core';
import FormInput from '../common/formInput'
import { useForm, FormProvider } from 'react-hook-form';
import Joi from 'joi-browser';
import { validate, validateField } from '../../hooks/useValidate'


const TodoItem = ({ todoitem }) => {
    console.log(todoitem)

    const [todo, setTodo] = useState({ _id: '', title: '', description: '', completed: false })
    const [errors, setErrors] = useState([]);
    const methods = useForm();

    const schema = {
        _id: Joi.string().allow(''),
        title: Joi.string().required().label('Title'),
        description: Joi.string().required().label('Description'),
        completed: Joi.boolean().required().label('ژompleted')
    }
    const mapToViewModel = (m) => {
        setTodo({
            _id: m._id,
            title: m.title,
            description: m.description,
            completed: m.completed
        })
    }

    const populateTodo = async () => {
        try {
            const todoId = todoitem._id;
            if (todoId === "new") return;
            console.log(todo)
            const _todo = await getTodo(todoId);
            mapToViewModel(_todo);
        }
        catch (ex) {
            // if (ex.response && ex.response.status === 404)
            //     history.replace("/not-found")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(todo, schema));
        if (errors) {
            return;
        }
        doSubmit();
    };

    const doSubmit = async () => {
        await saveTodo(todo);
    }


    useEffect(async () => {
        await populateTodo();
    }, []);
    return (
        <>
            <h1>Todo Form</h1>
            <FormProvider {...methods}>
                <form style={{ margin: "0 auto", width: "100%" }} onSubmit={(e) => handleSubmit(e, doSubmit)} noValidate>
                    <Paper style={{ padding: 16 }} variant="outlined">
                        <Grid container alignItems="flex-start" spacing={2}>
                            <FormInput
                                name='title'
                                label='Title'
                                value={todo.title}
                                // onChange={changeHandler}
                                required
                                size={12}
                                autoFocus={true}
                                error={errors && errors['title']} />
                            <FormInput
                                name='description'
                                label='Descriptiond'
                                value={todo.numberInStock}
                                // onChange={changeHandler}
                                required
                                size={12}
                                error={errors && errors['description']} />
                            <Grid item style={{ marginTop: 16 }}>
                                <Button variant="contained" color="primary" type="submit" disabled={!!validate(todo, schema)}>Save</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            </FormProvider>
        </>
    )
}

export default TodoItem