import { FormField } from '@/components/ui/form';
import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';

function CheckFieldComponent({ label, form, name }) {
    return (
        <FormField
            name={name}
            control={form.control}
            render={({ field }) => (
                <FormControlLabel
                    control={
                        <Checkbox
                            {...field}
                            checked={field.value === 1} // checked if value is 1
                            onChange={e =>
                                field.onChange(e.target.checked ? 1 : 0)
                            } // Set value to 1 for checked, 0 for unchecked
                        />
                    }
                    label={label}
                />
            )}
        />
    );
}

export default CheckFieldComponent;
