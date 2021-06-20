import React from 'react'
import { InputLabel, FormControl, Select, MenuItem, Grid } from '@material-ui/core';

const FormSelect = ({ items, id, labelId, label, selectedId, size, onChange, ...props }) => {
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
                        {...props}
                    >
                        {items.map(item => (
                            <MenuItem value={item._id} key={item._id}>{item.name}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
            </Grid>

        </>
    )
}

export default FormSelect
