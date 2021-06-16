import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { Paper, Grid, Button, Box } from '@material-ui/core'
import { Redirect } from 'react-router-dom'

import Joi from 'joi-browser';
import FormInput from '../common/formInput'
import { validate, validateField } from '../../hooks/useValidate'
import authService from '../../services/authService'

const Login = ({ location }) => {
    const [user, setUser] = useState({ _id: '', username: '', password: '' });
    const [errors, setErrors] = useState([]);
    const methods = useForm();

    const schema = {
        _id: Joi.number().allow(''),
        username: Joi.string().required().label('UserName'),
        password: Joi.string().label('Password'),
    }

    const changeHandler = ({ target: input }) => {
        const newErrorObj = validateField(input, schema, errors);
        setErrors(newErrorObj)
        const newUserObj = { ...user }
        newUserObj[input.name] = input.value;
        setUser(newUserObj)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(user, schema));
        if (errors) {
            return;
        }
        doSubmit();
    }

    const doSubmit = async (e) => {
        try {
            await authService.login(user.username, user.password)
            window.location = (location.state) ? location.state.from.pathname : '/';
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errs = { ...errors }
                errs.username = ex.response.data;
                setErrors(errs)
            }
        }
    }

    if (authService.getCurrentUser()) return <Redirect to="/" />

    return (
        <>
            <FormProvider {...methods}>
                <Box m={5}>
                    <form onSubmit={(e) => handleSubmit(e, doSubmit)} noValidate style={{ width: "400px", margin: "0 auto" }} >
                        <Paper style={{ padding: 16 }} variant="outlined">
                            <Grid container spacing={2}>
                                <FormInput
                                    name='username'
                                    label='Username'
                                    value={user.username}
                                    onChange={changeHandler}
                                    required
                                    size={12}
                                    autoFocus={true}
                                    error={errors && errors['username']} />
                                <FormInput
                                    name='password'
                                    label='Password'
                                    value={user.password}
                                    onChange={changeHandler}
                                    required
                                    size={12}
                                    autoFocus={true}
                                    error={errors && errors['password']} />
                                <Grid item >
                                    <Button variant="contained" color="primary" type="submit" disabled={validate(user, schema)}>Save</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </form>
                </Box>
            </FormProvider>
        </>
    )
}

export default Login
