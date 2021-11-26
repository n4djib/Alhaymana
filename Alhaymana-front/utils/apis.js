import axios from 'axios'

import { API_URL } from './urls'


export const getAgents = async () => {
    const res = await axios(`${API_URL}/agents`)
    return await res.data
}

export const getAgent = async (id) => {
    const res = await axios(`${API_URL}/agents/${id}`)
    return await res.data
}
