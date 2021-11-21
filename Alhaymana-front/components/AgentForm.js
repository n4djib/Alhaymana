import React, {useState} from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import Textfield from '../components/FormUI/Textfield'
import Button from '../components/FormUI/Button'
import FileUploader from './FormUI/FileUploader'
import Snack from './Snack'


import { API_URL } from '../utils/urls'
import styles from '../styles/FormElements.module.css'

const initialValues= {
    matricule: 'jj', nom: 'gg', prenom: 'ff',
    // nom_arab: '', prenom_arab: '',
    // data_naissance: '', lieu_naissance: '',
    // cin: '', cin_delivrer_par: '', cin_delivrer_le: '',
    cnas: '', num_acte_naissance: '',
    // telephone: '', adresse: '', email: '',
    // prenom_pere: '', nom_prenom_mere: '',
    // situation_familiale: '',
    photo: '',
    // sexe: '', groupe_sanguin: '',
}

const validationSchema = Yup.object().shape({
    matricule: Yup.string().required('Required'),
    nom: Yup.string().required('Required'),
    prenom: Yup.string().required('Required'),
    //
    //
    // cnas: Yup.string().required('Required'),
    // num_acte_naissance: Yup.string().required('Required'),
    // photo: Yup.string().required('Required'),
})

const onSubmit = async values => {
    console.log("Agent data", values)
    // const resp = await axios.post(`${API_URL}/agents`, values)
}

const AgentForm = () => {
    const [showSnack, setShowSnack] = useState(false)
    const [message, setMessage] = useState('')

    return (
        <div className={styles.Form}>
            <h3>Agent Form</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form>
                    <div className={styles.formElement}>
                        <Textfield
                            name="matricule" 
                            label="Matricule" 
                        />
                    </div>
                    <div className={styles.formElement}>
                        <Textfield
                            name="nom" 
                            label="Nom" 
                        />
                    </div>
                    <div className={styles.formElement}>
                        <Textfield
                            name="prenom" 
                            label="Prenom" 
                        />
                    </div>
                    <div className={styles.formElement}>
                        <FileUploader
                            type="file"
                            name="photo"
                            legend="Photo d'agent"
                        />
                    </div>

                    {/* <div className={styles.formElement}>
                        <Textfield
                            name="cnas" 
                            label="CNAS" 
                        />
                    </div>
                    <div className={styles.formElement}>
                        <Textfield
                            name="num_acte_naissance" 
                            label="Num Acte Naissance" 
                        />
                    </div> */}
                    <div className={styles.formElement}>
                        <Button >
                            Submit
                        </Button>
                    </div>
                </Form>
            </Formik>
            <Snack 
                open={showSnack} 
                onClose={setShowSnack} 
                message={message}
            />
        </div>
    )
}

export default AgentForm
