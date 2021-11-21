import Head from 'next/head'
import Image from 'next/image'

import {Formik, Field} from 'formik';

import ArticleForm from '../components/ArticleForm'
import AgentForm from '../components/AgentForm'


import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <h2>Home (Index)</h2>
      {/* <ArticleForm /> */}
      <AgentForm />
     
    </div>
  )
}
