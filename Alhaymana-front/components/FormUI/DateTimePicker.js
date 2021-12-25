import React, {useState} from 'react'

import frLocale from 'date-fns/locale/fr'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {
    TextField,
    FormControl,
    FormControlLabel, 
    FormGroup,
    FormLabel
} from '@mui/material'
import { useField, useFormikContext } from 'formik'


const DateTimePickerWrapper = ({name, label, legend, ...otherOptions}) => {
    // const [value, setValue] = useState(new Date())
    const [value, setValue] = useState(null)
    const [field, meta] = useField(name)

    const config = {
        type: 'date',
        variant: 'outlined',
        InputLabelProps: {
            shrink: true
        },
        ...field,
        ...otherOptions,
    }
    
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
            <FormControl>
                <FormLabel component="legend">{legend}</FormLabel>
                <FormGroup>
                    <DatePicker
                        // mask="'__/__/____'"
                        label={label}
                        {...config}
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </FormGroup>
            </FormControl>
        </LocalizationProvider>
    )
}

export default DateTimePickerWrapper
