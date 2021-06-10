import React, { useState } from 'react'
import Joi from 'joi-browser'

export const validate = (values, schema) => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(values, schema, options)
    if (!error) return;
    const errs = {}
    for (let err of error.details) {
        errs[err.path[0]] = err.message;
    }
    return errs;
}

export const validateProperty = ({ name, value }, schema) => {
    const obj = { [name]: value };
    const newSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, newSchema);
    if (!error)
        return null;
    return error.details[0].message;
}