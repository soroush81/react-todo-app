import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';
function FormInput({ value, error, name, size, ...rest }) {
    const { control } = useFormContext();
    return (
        <Grid item xs={size}>
            <Controller
                render={({ field }) => (
                    <TextField
                        fullWidth
                        {...rest}
                        name={name}
                        value={value}
                        error={error !== undefined}
                        helperText={error && (value === "" ? error : ' ')}
                    />
                )}
                name={name}
                control={control}
            />
        </Grid>
    );
}

export default FormInput;