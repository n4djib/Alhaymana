import React, {useState} from 'react'
// import Breadcrumbs from '../../components/UI/Breadcrumbs'

import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import PopupDialog from '../../components/UI/PopupDialog'
import SiteForm from '../../components/SiteForm'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

import { getGroupes } from '../../utils/apis'


const index = ({groupes}) => {
    const [openPopup, setOpenPopup] = useState(false)
    const [openCreationForm, setOpenCreationForm] = useState(false)

    return (
        <div style={{margin: 30}}>
            <div>
                List des Groupes
            </div>
            
            <div>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>#</b></TableCell>
                                <TableCell><b>Nom</b></TableCell>
                                <TableCell><b>Chef Groupe</b></TableCell>
                                <TableCell><b>Site</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {groupes.map((groupe, index) => (
                                <TableRow
                                    key={groupe.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    // onClick={}
                                >
                                    <TableCell component="th" sadressecope="row">
                                        {index+1}
                                    </TableCell>
                                    <TableCell>{groupe.nom}</TableCell>
                                    <TableCell>{groupe.chef_groupe}</TableCell>
                                    <TableCell>
                                        {groupe.site ? (
                                            <span>{groupe.site.nom}</span>
                                        ):null}
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
                    <SiteForm 
                        closeAction={() => setOpenPopup(false)} 
                    />
                </PopupDialog>)
            }

        </div>
    )
}

export async function getServerSideProps(context) {
    const groupes = await getGroupes()

    return {
        props: {
            groupes
        }
    }
}

export default index
