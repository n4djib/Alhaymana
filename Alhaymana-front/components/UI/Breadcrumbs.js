import React from 'react'

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
import Link from 'next/link'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const BreadcrumbsWrapper = () => {

    const breadcrumbs = [
        <Link key="1" color="inherit" underline="hover" 
            href="/" 
        >
            Home
        </Link>,
        <Link key="2" color="inherit" underline="hover" 
            href="/articles/"
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
            </Breadcrumbs>
        </div>
    )
}

export default BreadcrumbsWrapper
