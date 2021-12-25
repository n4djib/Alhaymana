import React, {useState} from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

// import { useRouter } from 'next/router'

import Textfield from '../components/FormUI/Textfield'
import Button from '../components/FormUI/Button'
import Snack from './UI/Snack'
import FileUploader from './FormUI/FileUploader'

// import DateTimePicker from '../components/FormUI/DateTimePicker'

import { API_URL } from '../utils/urls'
// import { createFormData } from '../utils/utilities'
import styles from '../styles/FormElements.module.css'


const initialValues= {
    code: '',
    designation: '',
}

const validationSchema = Yup.object().shape({
    code: Yup.string().required('Required'),
    designation: Yup.string().required('Required'),
})

const ArticleForm = () => {
    const [files, setFiles] = useState(null)
    const [showSnack, setShowSnack] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')

    // const router = useRouter()
    
    const onSubmit = async (values) => {
        try {
            const formData = new FormData()
            formData.append('data', JSON.stringify(values))
            if(files !== null)
                formData.append('files.image', files[0])
            
            const resp = await axios.post(
                `${API_URL}/articles`, 
                formData, 
            )
            const data = await resp.data
            // console.log("data: ", data)

            setSeverity('success')
            setMessage(`Msg: ${values.code} ${values.designation}`)
            setShowSnack(true)

            //useRouter
            // router.push('/articles')
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
        <div className={styles.Form} style={{margin: 25}}>
            <h3>Article Form</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
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
