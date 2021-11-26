import React from 'react'
import Link from 'next/link'
import Breadcrumbs from '../../components/Breadcrumbs'


const index = () => {
    return (
        <div>
            <Breadcrumbs />
            <div>
                List des Articles
            </div>
            <div>
                <Link href='articles/create'><a>Créer un article</a></Link>  
            </div>
        </div>
    )
}

export default index
