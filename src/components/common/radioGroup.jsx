import React from 'react';
import { Radio, FormControlLabel, RadioGroup } from '@material-ui/core';

function RadioGroupList({ data, value, handleChange }) {
    return (
        <RadioGroup aria-label="filter" row name="filterStatus" value={value} onChange={handleChange}>
            {
                data.map(item => <FormControlLabel value={item.value} control={<Radio />} label={item.label} />)
            }
        </RadioGroup>
    );
}

export default RadioGroupList;