import React from 'react'

import AgentsList from '../../components/AgentsList'
import { getAgents } from '../../utils/apis'

import styles from '../../styles/Agents.module.css'

const agents = ({agents}) => {
    return (
        <div className={styles.Agents}>
            <h2>List des Agents</h2>
            <div>
                <AgentsList agents={agents} />
            </div>
        </div>
    )
}

// export async function getServerSideProps(context) {
export async function getStaticProps(context) {
    const agents = await getAgents()
    return {
        props: {
            agents
        },
        // revalidate: 5,
    }
}

export default agents
