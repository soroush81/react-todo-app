import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid, Box } from '@material-ui/core';
function FormInput({ value, error, name, size, ...rest }) {
    const { control } = useFormContext();
    return (
        <Grid item xs={size}>
            <Box mt={2}>
                <Controller
                    render={({ field }) => (
                        <TextField
                            variant="outlined"
                            fullWidth
                            {...rest}
                            autoComplete="on"
                            name={name}
                            value={value}
                            error={error !== undefined}
                            helperText={error && (value === "" ? error : ' ')}
                        />
                    )}
                    name={name}
                    control={control}
                />
            </Box>
        </Grid>
    );
}

export default FormInput;