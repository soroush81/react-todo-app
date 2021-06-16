import React from 'react';
import { Radio, FormControlLabel, RadioGroup } from '@material-ui/core';

function RadioGroupList({ data, value, handleChange, }) {
    return (
        <RadioGroup aria-label="filter" row name="filterStatus" value={value} onChange={handleChange}>
            {
                data.map(item => (
                    <FormControlLabel
                        key={item.value}
                        value={item.value}
                        control={<Radio color="primary" size="small" />}
                        label={<span style={{ fontSize: 'x-small' }}>{item.label}</span>} />
                ))
            }
        </RadioGroup>
    );
}

export default RadioGroupList;