import React, {useState} from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import Textfield from '../components/FormUI/Textfield'
import Button from '../components/FormUI/Button'
import Snack from './Snack'
import FileUploader from './FormUI/FileUploader'

// import DateTimePicker from '../components/FormUI/DateTimePicker'

import { API_URL } from '../utils/urls'
import { createFormData } from '../utils/utilities'
import styles from '../styles/FormElements.module.css'

const initialValues= {
    code: 'hh',
    designation: 'hh',
}

const validationSchema = Yup.object().shape({
    code: Yup.string().required('Required'),
    designation: Yup.string().required('Required'),
})


// const createFormData = (file, ref, refId, field) => {
//     const formData = new FormData()
//     formData.append('files', file)
//     formData.append('ref', ref)
//     formData.append('refId', refId)
//     formData.append('field', field)

//     return formData
// }

const ArticleForm = () => {
    const [files, setFiles] = useState(null)

    const [showSnack, setShowSnack] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')

    const onSubmit = async (values) => {
        try {
            const resp = await axios.post(
                `${API_URL}/articles`, 
                values, 
            )
            const data = await resp.data
            console.log("data: ", data)

            // upload the image and associate it to the new model
            if (resp.status == 200 && files !== null){
                const file = files[0]
                
                const ref = 'article'
                const refId = String(data.id)
                const field = 'image'
                const formData = createFormData(file, ref, refId, field)
                
                const resp_img = await axios.post(
                    `${API_URL}/upload`, 
                    formData, 
                )
                const data_img = await resp_img.data
                console.log("data_img: ", data_img)
            }
    
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
        setFiles(event.target.files)
    }

    return (
        <div className={styles.Form}>
            <h3>Article Form</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form>
                    <div className={styles.formElement}>
                        <Textfield
                            name="code" 
                            label="Code" 
                        />
                    </div>
                    <div className={styles.formElement}>
                        <Textfield
                            name="designation" 
                            label="Designation" 
                        />
                    </div>
                    {/* <div className={styles.formElement}>
                        <DateTimePicker
                            name="date" 
                            label="Date" 
                            legend="Date" 
                        />
                    </div> */}
                    <div className={styles.formElement}>
                        <FileUploader
                            // name="image"
                            legend="Image d'article"
                            handleChange={handleFileChange}
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

export default ArticleForm
