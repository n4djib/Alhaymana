import React, {useState} from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import Textfield from '../components/FormUI/Textfield'
import Button from '../components/FormUI/Button'
import Snack from './UI/Snack'
// import FileUploader from './FormUI/FileUploader'

// import DateTimePicker from '../components/FormUI/DateTimePicker'

import { API_URL } from '../utils/urls'
// import { createFormData } from '../utils/utilities'
import styles from '../styles/FormElements.module.css'

const initialValues= {
    nom: '',
    adresse: '',
    chef_site: '',
    gps_latitude: '',
    gps_longitude: '',
}

const validationSchema = Yup.object().shape({
    nom: Yup.string().required('Required'),
    adresse: Yup.string().required('Required'),
    chef_site: Yup.string(),
    // gps_latitude: Yup.string(),
    // gps_longitude: Yup.string(),
})

const SiteForm = () => {
    // const [files, setFiles] = useState(null)
    const [showSnack, setShowSnack] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')
    
    const onSubmit = async (values) => {
        try {
            const formData = new FormData()
            formData.append('data', JSON.stringify(values))
            // if(files !== null)
            //     formData.append('files.image', files[0])
            
            const resp = await axios.post(
                `${API_URL}/sites`, 
                formData, 
                // values, 
            )
            const data = await resp.data
            // console.log("data: ", data)

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
    
    // const handleFileChange = event => {
    //     setFiles(event.target.files)
    // }

    return (
        <div className={styles.Form} style={{margin: 25}}>
            <h3>Site Form</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
            >
                <Form>
                    <div className={styles.formElement}>
                        <Textfield
                            name="nom" 
                            label="Nom" 
                        />
                    </div>
                    <div className={styles.formElement}>
                        <Textfield
                            name="adresse" 
                            label="Adresse" 
                        />
                    </div>
                    <div className={styles.formElement}>
                        <Textfield
                            name="chef_site" 
                            label="Chef Site" 
                        />
                    </div>
                    <div className={styles.formElement}>
                        <Textfield
                            name="gps_latitude" 
                            label="GPS Latitude" 
                        />
                    </div>
                    <div className={styles.formElement}>
                        <Textfield
                            name="gps_longitude" 
                            label="GPS Longitude" 
                        />
                    </div>
                    
                    {/* <div className={styles.formElement}>
                        <FileUploader
                            // name="image"
                            legend="Image d'article"
                            handleChange={handleFileChange}
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
                severity={severity}
            />
        </div>
    )
}

export default SiteForm
