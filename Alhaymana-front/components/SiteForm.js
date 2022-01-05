import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

import Textfield from "../components/FormUI/Textfield";
import Button from "../components/FormUI/Button";
import Snack from "./UI/Snack";
// import FileUploader from './FormUI/FileUploader'

// import DateTimePicker from '../components/FormUI/DateTimePicker'

import { API_URL } from "../utils/urls";
// import { createFormData } from '../utils/utilities'
import styles from "../styles/FormElements.module.css";

const initialValues = {
  nom: "",
  adresse: "",
  chef_site: "",
  gps_latitude: "",
  gps_longitude: "",
};

const validationSchema = Yup.object().shape({
  nom: Yup.string().required("Required"),
  adresse: Yup.string().required("Required"),
  chef_site: Yup.string(),
  // gps_latitude: Yup.string(),
  // gps_longitude: Yup.string(),
});

const SiteForm = ({ snackOnSuccess }) => {
  // const [files, setFiles] = useState(null)
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(values));

      const resp = await axios.post(`${API_URL}/sites`, formData);
      const data = await resp.data;

      snackOnSuccess("success", "Soumettre avec succès");
      setShowSnack(true);
    } catch (err) {
      console.log("err", err);
      setSeverity("error");
      setMessage("some error happened");
      setShowSnack(true);
    }
  };

  return (
    <div className={styles.Form} style={{ margin: 25 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <Form>
          <div className={styles.formElement}>
            <Textfield name="nom" label="Nom" />
          </div>
          <div className={styles.formElement}>
            <Textfield name="adresse" label="Adresse" />
          </div>
          <div className={styles.formElement}>
            <Textfield name="chef_site" label="Chef Site" />
          </div>
          <div className={styles.formElement}>
            <Textfield name="gps_latitude" label="GPS Latitude" />
          </div>
          <div className={styles.formElement}>
            <Textfield name="gps_longitude" label="GPS Longitude" />
          </div>

          <div className={styles.formElement}>
            <Button>Soumettre</Button>
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
  );
};

export default SiteForm;
