import React from 'react'

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
import Link from 'next/link'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const BreadcrumbsWrapper = () => {

    const breadcrumbs = [
        <Link 
            underline="hover" key="1" color="inherit" href="/" 
            // onClick={handleClick}
        >
            Home
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/getting-started/installation/"
            // onClick={handleClick}
        >
          Core
        </Link>,
        <Typography key="3" color="text.primary">
            Breadcrumb
        </Typography>,
    ];
    

    return (
        <div>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                {breadcrumbs}
                {/* Breadcrumbs */}
            </Breadcrumbs>
        </div>
    )
}

export default BreadcrumbsWrapper
