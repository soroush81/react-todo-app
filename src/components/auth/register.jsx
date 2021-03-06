import React, { useState } from 'react'
import { Paper, Grid, Button, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import Joi from 'joi-browser'
import { register } from '../../services'
import FormInput from '../common/formInput'
import { validateField, validate } from '../../hooks/useValidate'

const Register = ({ history }) => {
    const [user, setUser] = useState({ username: '', password: '', firstname: '', lastname: '', email: '' });
    const [errors, setErrors] = useState([]);
    const methods = useForm();
    const schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().min(5).required().label('Password'),
        firstname: Joi.string().required().label('FirstName'),
        lastname: Joi.string().required().label('LastName'),
        email: Joi.string().required().label('Email')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(user, schema));
        if (errors && Object.keys(errors).length !== 0) {
            return;
        }
        doSubmit();
    };

    const doSubmit = async () => {
        await register(user)
        history.push('/')

    }

    const changeHandler = ({ target: input }) => {
        const newErrorObj = validateField(input, schema, errors);
        setErrors(newErrorObj);
        const newValueObj = { ...user };
        newValueObj[input.name] = input.value;
        setUser(newValueObj);
    }
    return (
        <>
            <FormProvider {...methods}>
                <form style={{ margin: "0 auto", width: "450px" }} onSubmit={(e) => handleSubmit(e)} noValidate>
                    <Paper style={{ padding: 16 }} variant="outlined">
                        <Grid container alignItems="flex-start" spacing={2}>
                            <FormInput
                                name='username'
                                label='UserName'
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
                                type='password'
                                error={errors && errors['password']} />
                            <FormInput
                                name='firstname'
                                label='FirstName'
                                value={user.firstname}
                                onChange={changeHandler}
                                required
                                size={12}
                                error={errors && errors['firstname']} />
                            <FormInput
                                name='lastname'
                                label='LastName'
                                value={user.lastname}
                                onChange={changeHandler}
                                required
                                size={12}
                                error={errors && errors['lastname']} />
                            <FormInput
                                name='email'
                                label='Email'
                                value={user.email}
                                onChange={changeHandler}
                                required
                                size={12}
                                error={errors && errors['email']} />
                            <Grid item style={{ marginTop: 16 }}>
                                <Button variant="contained" color="primary" type="submit" disabled={validate(user, schema)}>Register</Button>
                            </Grid>
                            <Grid item style={{ marginTop: 16, color: "red" }}>
                                <Typography variant="caption">
                                    {(errors && Object.keys(errors).length !== 0) ? Object.values(errors) : null}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            </FormProvider>

        </>
    )
}

export default Register
