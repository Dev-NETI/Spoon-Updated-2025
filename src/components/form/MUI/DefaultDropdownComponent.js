import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DefaultDropdownComponent({
    data = null,
    label,
    setState,
    value,
    ...props
}) {
    const handleChange = event => {
        setState(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={value || ''}
                label={label}
                onChange={handleChange}
                {...props}
            >
                {data &&
                    data.map(item => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    );
}
