import React from 'react'
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton'


function PopupDialog(props) {
    const { children, openPopup, onClose } = props


    return (
        <div className="PopupDialog">
            <Dialog open={openPopup} fullWidth maxWidth="md" >
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </Dialog>
        </div>
    )
}

export default PopupDialog
