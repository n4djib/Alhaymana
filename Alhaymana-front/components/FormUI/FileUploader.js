import React, {useState} from 'react'
import IconButton from '@mui/material/IconButton'
import ImageIcon from '@mui/icons-material/Image'
import AccountBox from '@mui/icons-material/AccountBox'


const Icon = ({children, ...otherProps}) => {
    return (<div>
        <IconButton {...otherProps} >
            {children}
        </IconButton>
    </div>)
}

const FileUploader = ({legend, handleChange, ...otherOptions}) => {
    const config = {
        variant: 'outlined',
        ...otherOptions,
        onChange: handleChange,
    }

    return (
        <label htmlFor="icon-button-file">
            <input 
                {...config}
                accept="image/*" 
                id="icon-button-file" 
                type="file" 
                style={{display: 'none'}}
            />
            {/* <IconButton color="primary" aria-label="upload picture" component="span">
                <AccountBox variant={config.variant} fontSize="medium" /> {legend}
            </IconButton> */}
            <Icon color="primary" aria-label="upload picture" component="span" >
                <AccountBox variant={config.variant} fontSize="medium" />
                {legend}
            </Icon>
        </label> 
    )
}

export default FileUploader


// import Uploady from '@rpldy/uploady'
// import UploadButton from '@rpldy/upload-button'
// import UploadPreview from '@rpldy/upload-preview'

//         <Uploady {...config} destination={{ url: `${UPLOAD_URL}/agents-photos`}} >
//             <UploadButton>Upload Image</UploadButton>
//             <div className={styles.ImageUploader}>
//                 <UploadPreview  />
//             </div>
//         </Uploady>
