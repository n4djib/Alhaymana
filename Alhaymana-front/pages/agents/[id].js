
import React from 'react'
import { useRouter } from 'next/router'

import { getAgent, getAgents } from '../../utils/apis'

const agent = ({agent}) => {
    return (
        <div>
            <p>{agent.id}</p>
            <p>{agent.nom}</p>
            <p>{agent.prenom}</p>
        </div>
    )
}

// export async function getServerSideProps(context) {
//     const { query: {id} } = context
//     const agent = await getAgent(id)

//     return {
//         props : {
//             agent
//         }
//     }
// }

export async function getStaticProps(context) {
    const { params } = context
    const agent = await getAgent(params.id)
    return {
        props : {
            agent
        },
        revalidate: 5,
    }
}
 
export async function getStaticPaths() {
    const agents = await getAgents()

    const paths = agents.map(agent => (
        {params: {id: String(agent.id)}}
    ))

    return {
        paths,
        fallback: false
    }
}

export default agent
