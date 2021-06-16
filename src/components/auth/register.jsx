import React, { useState } from 'react'
import { Paper, Grid, Button } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import Joi from 'joi-browser'
import * as userService from '../../services/userService'
import FormInput from '../common/formInput'
import { validateField, validate } from '../../hooks/useValidate'
import auth from '../../services/authService'

const Register = ({ history }) => {
    const [user, setUser] = useState({ username: '', password: '', name: '' });
    const [errors, setErrors] = useState([]);
    const methods = useForm();

    const schema = {
        username: Joi.string().email().required().label('Username'),
        password: Joi.string().min(5).required().label('Password'),
        name: Joi.string().required().label('Name')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(user, schema));
        if (errors) {
            return;
        }
        doSubmit();
    };

    const doSubmit = async () => {
        try {
            const response = await userService.register(user)
            auth.loginWithJwt(response.headers['x-auth-token']);
            window.location = "/";
        }
        catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errs = { ...errors };
                errs.username = ex.response.data;
                setErrors(errs)
            }
        }
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
                                error={errors && errors['username']} />
                            <FormInput
                                name='name'
                                label='Name'
                                value={user.name}
                                onChange={changeHandler}
                                required
                                size={12}
                                error={errors && errors['name']} />
                            <Grid item style={{ marginTop: 16 }}>
                                <Button variant="contained" color="primary" type="submit" disabled={validate(user, schema)}>Register</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            </FormProvider>
        </>
    )
}

export default Register
