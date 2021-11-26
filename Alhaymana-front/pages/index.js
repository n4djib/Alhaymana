import Head from 'next/head'
import Image from 'next/image'

import Link from 'next/link'

import {Formik, Field} from 'formik'

// import ArticleForm from '../components/ArticleForm'
// import AgentForm from '../components/AgentForm'

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      {/* <ArticleForm /> */}
      {/* <AgentForm /> */}

      <h3><Link href="/agents"><a>Agents</a></Link></h3>
      <h3><Link href="/articles"><a>Articles</a></Link></h3>
    </div>
  )
}
