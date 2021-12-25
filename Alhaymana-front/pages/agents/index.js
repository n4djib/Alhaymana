import React, {useState} from 'react'
import Link from 'next/link'

import AgentsList from '../../components/AgentsList'
import { getAgents } from '../../utils/apis'

import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import PopupDialog from '../../components/UI/PopupDialog'
import AgentForm from '../../components/AgentForm'

import styles from '../../styles/Agents.module.css'


const agents = ({agents}) => {
    const [openPopup, setOpenPopup] = useState(false)
    const [openCreationForm, setOpenCreationForm] = useState(false)

    return (
        <div className={styles.Agents}>
            <h2>List des Agents</h2>
            <div>
                <AgentsList agents={agents} />
            </div>
            <div>
                {/* <Link href='agents/create'><a>Créer un agent</a></Link>   */}
                <Fab color="primary" 
                    onClick={() => setOpenPopup(true)}
                    aria-label="add" 
                    style={{margin:7}}>
                    <AddIcon />
                </Fab>
            </div>
            {openPopup ? 
                (<PopupDialog openPopup={openPopup} onClose={() => setOpenPopup(false)}>
                    <AgentForm 
                        closeAction={() => setOpenPopup(false)} 
                    />
                </PopupDialog>)
            :
            null
            }
        </div>
    )
}

export async function getServerSideProps(context) {
// export async function getStaticProps(context) {
    const agents = await getAgents()
    return {
        props: {
            agents
        },
        // revalidate: 5,
    }
}

export default agents
