// import Head from 'next/head'
// import Image from 'next/image'

import Link from 'next/link'

// import {Formik, Field} from 'formik'


import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

// import ArticleForm from '../components/ArticleForm'
// import AgentForm from '../components/AgentForm'7


import styles from '../styles/Home.module.css'
import BoxLink from '../components/UI/BoxLink'

export default function Home() {
  console.log('zzzz')
  return (
    <div className={styles.container}>

        <BoxLink href="/agents" >
            Les Agents
        </BoxLink>

        <BoxLink href="/articles" >
            Les Articles
        </BoxLink>

        <BoxLink href="/decharges" >
            Decharges
        </BoxLink>

        <BoxLink href="/groupes" >
            Groupes
        </BoxLink>

        <BoxLink href="/sites" >
            Sites
        </BoxLink>

        <ol>
          <li>Sites</li>
          <li>Groupes</li>
          <li>Décharges</li>
          <li>Contrat</li>
          <li>Rotation</li>
        </ol>
    </div>
  )
}
