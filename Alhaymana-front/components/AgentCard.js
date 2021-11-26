import React from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

import styles from '../styles/AgentCard.module.css'
import { getAgentThumbnail } from '../utils/urls'


const AgentCard = ({agent}) => {
    const agent_thumbnail = getAgentThumbnail(agent)

    return (
        <Card elevation={3} sx={{ width: 200, height: 300 }} className={styles.AgentCard}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="150"
                    image={agent_thumbnail} 
                    alt="agent photo"
                    style={{objectFit: 'none'}}
                />
                <CardContent style={{paddingTop: 0}} >
                    <Typography style={{margin: 0}} gutterBottom  variant="h6" component="div">
                        {agent.nom}
                    </Typography>
                    <Typography style={{margin: 0}} gutterBottom  variant="h6" component="div">
                        {agent.prenom ? agent.prenom : " "}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {agent.nom_arab ? agent.nom_arab : " "} 
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {agent.prenom_arab ? agent.prenom_arab : " "} 
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {agent.date_naissance ? agent.date_naissance : " "} 
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default AgentCard
