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

import { getSites } from '../../utils/apis'


const index = ({sites}) => {
    const [openPopup, setOpenPopup] = useState(false)
    const [openCreationForm, setOpenCreationForm] = useState(false)

    return (
        <div style={{margin: 30}}>
            <div>
                List des Sites
            </div>
            
            <div>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>#</b></TableCell>
                                <TableCell><b>Nom</b></TableCell>
                                <TableCell><b>Adresse</b></TableCell>
                                <TableCell><b>Chef Site</b></TableCell>
                                <TableCell><b>GPS Latetude</b></TableCell>
                                <TableCell><b>GPS Longitude</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sites.map((site, index) => (
                                <TableRow
                                    key={site.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    // onClick={}
                                >
                                    <TableCell component="th" sadressecope="row">
                                        {index+1}
                                    </TableCell>
                                    <TableCell >{site.nom}</TableCell>
                                    <TableCell >{site.adresse}</TableCell>
                                    <TableCell >{site.chef_site}</TableCell>
                                    <TableCell >{site.gps_latitude}</TableCell>
                                    <TableCell >{site.gps_longitude}</TableCell>
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
    const sites = await getSites()

    return {
        props: {
            sites
        }
    }
}

export default index
