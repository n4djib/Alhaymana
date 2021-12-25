import React, {useState} from 'react'
// import Link from 'next/link'
import Breadcrumbs from '../../components/UI/Breadcrumbs'

import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import PopupDialog from '../../components/UI/PopupDialog'
import ArticleForm from '../../components/ArticleForm'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';



import useSWR from 'swr'
import { fetcher, getArticles } from '../../utils/apis'
import { API_URL, getThumbnail } from '../../utils/urls'


const index = ({articles}) => {
    const [openPopup, setOpenPopup] = useState(false)
    const [openCreationForm, setOpenCreationForm] = useState(false)


    const { data, error } = useSWR(`${API_URL}/articles`, fetcher, { refreshInterval: 1 })

    // console.log("data", data)
    if(data !== undefined){
        articles = data
        // console.log("articles = data")
    }

    // const refresh = () => {
    //     articles = await fetcher(`${API_URL}/articles`)
    // }


    return (
        <div style={{margin: 20}}>
            {/* <Breadcrumbs /> */}
            <div>List des Articles</div>
            <div>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>  
                                <TableCell><b>#</b></TableCell>
                                <TableCell><b>Code</b></TableCell>
                                <TableCell><b>Designation</b></TableCell>
                                <TableCell><b>Image</b></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {articles.map((article, index) => (
                                <TableRow
                                    key={article.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    // onClick={}
                                >
                                    <TableCell component="th" scope="row">
                                        {index+1}
                                    </TableCell>
                                    <TableCell >{article.code}</TableCell>
                                    <TableCell >{article.designation}</TableCell>
                                    <TableCell >
                                        {article.image ? (
                                            <img src={getThumbnail(article.image)} style={{maxWidth:50}} />
                                        ): null
                                    }</TableCell>
                                    <TableCell>
                                        Edit | delete
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div>
                <Fab color="primary" 
                    onClick={() => setOpenPopup(true)}
                    aria-label="add" 
                    style={{margin:7}}>
                    <AddIcon />
                </Fab>
            </div>
            {openPopup && 
                (<PopupDialog openPopup={openPopup} onClose={() => setOpenPopup(false)}>
                    <ArticleForm 
                        closeAction={() => {
                            setOpenPopup(false)
                            //trigger fetch
                            // refresh()
                        }} 
                    />
                </PopupDialog>)
            }

        </div>
    )
}

export async function getServerSideProps(context) {
    const articles = await getArticles()

    return {
        props: {
            articles
        }
    }
}

export default index
