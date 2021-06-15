import React, { useState, useEffect } from 'react'
import { getTodo, saveTodo } from '../../services/todoService'
import { Paper, Grid, Button } from '@material-ui/core';
import FormInput from '../common/formInput'
import { useForm, FormProvider } from 'react-hook-form';
import Joi from 'joi-browser';
import { validate, validateField } from '../../hooks/useValidate'
import { useStyles } from './styles';

const TodoItem = ({ todoitem, handleClose }) => {
    const [todo, setTodo] = useState({ _id: '', title: '', description: 'description', completed: false })
    const [errors, setErrors] = useState([]);
    const methods = useForm();
    const classes = useStyles()

    const schema = {
        _id: Joi.number().allow(''),
        title: Joi.string().required().label('Title'),
        description: Joi.string().label('Description'),
        completed: Joi.boolean().required().label('Completed')
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
            const _todo = await getTodo(todoId);
            mapToViewModel(_todo);
        }
        catch (ex) {
        }
    }


    useEffect(async () => {
        await populateTodo();
    }, []);

    const changeHandler = ({ target: input }) => {
        setErrors(validateField(input, schema, errors));
        const newTodo = { ...todo };
        newTodo[input.name] = input.value;
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
        await saveTodo(todo);
        handleClose();
    }


    return (
        <>
            <FormProvider {...methods}>
                <form className={classes.marginAuto} onSubmit={(e) => handleSubmit(e, doSubmit)} noValidate>
                    <Paper variant="outlined" className={classes.fullWidth}>
                        <Grid container className={classes.marginAuto} spacing={2}>
                            <FormInput
                                name='title'
                                label='Title'
                                value={todo.title}
                                onChange={changeHandler}
                                required
                                size={12}
                                autoFocus={true}
                                error={errors && errors['title']} />
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