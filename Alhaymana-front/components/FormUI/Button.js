import React from 'react'
import Button from '@mui/material/Button'
import {useFormikContext} from 'formik'

const ButtonWrapper = ({children, ...otherProps}) => {
    const {submitForm} = useFormikContext()

    const handleSubmit = () => {
        submitForm()
    }

    const config = {
        variant: 'contained',
        color: 'primary',
        fullWidth: true,
        onClick: handleSubmit,
        ...otherProps,
    }

    return (
        <div>
            <Button {...config}>
                {children}
            </Button>
        </div>
    )
}

export default ButtonWrapper
