import React, {useState} from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Grid from '@mui/material/Grid'

import Textfield from '../components/FormUI/Textfield'
import Button from '../components/FormUI/Button'
import FileUploader from './FormUI/FileUploader'
import DateTimePicker from './FormUI/DateTimePicker'
import Select from './FormUI/Select'
import Snack from './UI/Snack'

import { API_URL } from '../utils/urls'
import styles from '../styles/FormElements.module.css'


const initialValues= {
    matricule: '', nom: '', prenom: '',
    nom_arab: '', prenom_arab: '',
    date_naissance: '', lieu_naissance: '',
    cin: '', cin_delivrer_par: '', cin_delivrer_le: '',
    cnas: '', num_acte_naissance: '',
    // telephone: '', adresse: '', email: '',
    // prenom_pere: '', nom_prenom_mere: '',
    // situation_familiale: '',
    // photo: '',
    sexe: '', groupe_sanguin: '',
}

const validationSchema = Yup.object().shape({
    matricule: Yup.string().required('Required'),
    nom: Yup.string().required('Required'),
    prenom: Yup.string().required('Required'),
    //
    //
    // date_naissance: Yup.
    cin: Yup.string().required('Required'),
    cnas: Yup.string().required('Required'),
    num_acte_naissance: Yup.string().required('Required'),
    // photo: Yup.string().required('Required'),
})

// const onSubmit = async values => {
//     console.log("Agent data", values)
//     // const resp = await axios.post(`${API_URL}/agents`, values)
// }

const AgentForm = () => {
    const [files, setFiles] = useState(null)
    const [showSnack, setShowSnack] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')
    
    const onSubmit = async (values) => {
        try {
            const formData = new FormData()
            formData.append('data', JSON.stringify(values))
            if(files !== null)
                formData.append('files.photo', files[0])
            
            const resp = await axios.post(
                `${API_URL}/agents`, 
                formData, 
            )
            const data = await resp.data
            // console.log("files", files)
            // console.log("data", data)

            setSeverity('success')
            setMessage(`Msg: ${values.code} ${values.designation}`)
            setShowSnack(true)
        } catch (err) {
            console.log("err", err)
            setSeverity('error')
            setMessage('some error happened')
            setShowSnack(true)
        }
    }
    
    const handleFileChange = event => {
        // console.log(event.target.files)
        setFiles(event.target.files)
    }

    return (
        // maxWidth: 600, 
        <div style={{margin: 25}}>
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
                            label="Matricule *" 
                        />
                    </div>
                    <div className={styles.formElement}>
                        <Textfield
                            name="nom" 
                            label="Nom *" 
                        />
                    </div>
                    <div className={styles.formElement}>
                        <Textfield
                            name="prenom" 
                            label="Prenom *" 
                        />
                    </div>
                    <div className={styles.formElement}>
                        <Textfield
                            name="nom_arab" 
                            label="اللقب بالعربي" 
                            dir="rtl"
                        />
                    </div>
                    <div className={styles.formElement} dir="rtl">
                        <Textfield 
                            name="prenom_arab" 
                            label="الاسم بالعربي" 
                            dir="rtl"
                        />
                    </div>
                    <div className={styles.formElement}>
                        <FileUploader
                            // name="photo"
                            legend="Photo d'agent"
                            handleChange={handleFileChange}
                        />
                    </div>

                    <div className={styles.formElement}>
                        <DateTimePicker
                          name="date_naissance"  
                          label="Date Naissance"
                        />
                    </div>
                    <div className={styles.formElement}>
                        <Textfield
                            name="lieu_naissance" 
                            label="Lieu Naissance"
                        />
                    </div>

                    <div className={styles.formElement}>
                        <Textfield
                            name="cin" 
                            label="CIN *" 
                        />
                    </div>
                    <div className={styles.formElement}>
                        <Textfield
                            name="cin_delivrer_par" 
                            label="CIN Delivrer par" 
                        />
                    </div>
                    <div className={styles.formElement}>
                        <DateTimePicker
                          name="cin_delivrer_le"  
                          label="CIN Delivrer le"
                        />
                    </div>

                    <div className={styles.formElement}>
                        <Textfield
                            name="cnas" 
                            label="CNAS" 
                        />
                    </div>
                    <div className={styles.formElement}>
                        <Textfield
                            name="num_acte_naissance" 
                            label="Num Acte Naissance *" 
                        />
                    </div>
                    <div className={styles.formElement}>
                        <Select
                            name="sexe" 
                            label="Sexe *"
                            options={{
                                "M": "Masculin",
                                "F": "Féminin",
                            }}
                            style={{width: 245}}
                        />
                    </div>
                    <div className={styles.formElement}>
                        <Select
                            name="groupe_sanguin" 
                            label="Groupe Sanguin *"
                            options={{
                                "A_positif": "A Positif",
                                "A_negatif": "A Negatif",
                                "B_positif": "B Positif",
                                "B_negatif": "B Negatif",
                                "AB_positif": "AB Positif",
                                "AB_negatif": "AB Negatif",
                                "O_positif": "O Positif",
                                "O_negatif": "O Negatif",
                            }}
                            style={{width: 245}}
                        />
                    </div>
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
                severity={severity}
            />
        </div>
    )
}

export default AgentForm
