import React from 'react'
import { InputLabel, FormControl, Select, MenuItem, Grid } from '@material-ui/core';

const FormSelect = ({ items, id, labelId, label, selectedId, size, onChange, error, ...props }) => {
    return (
        <>
            <Grid item xs={size}>
                <FormControl style={{ width: "100%" }}>
                    <InputLabel id={labelId}>{label}</InputLabel>
                    <Select
                        labelId={labelId}
                        id={id}
                        name={id}
                        value={selectedId}
                        onChange={onChange}
                        fullWidth
                        error={error !== undefined}
                        {...props}
                    >
                        {items.map(item => (
                            <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
            </Grid>

        </>
    )
}

export default FormSelect
