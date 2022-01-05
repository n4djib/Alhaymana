import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

import Textfield from "../components/FormUI/Textfield";
import Button from "../components/FormUI/Button";
import Snack from "./UI/Snack";
// import FileUploader from './FormUI/FileUploader'

// import DateTimePicker from '../components/FormUI/DateTimePicker'

import { API_URL } from "../utils/urls";
import { getSites } from "../utils/apis";

// import { createFormData } from '../utils/utilities'
import styles from "../styles/FormElements.module.css";
import Select from "../components/FormUI/Select";

const initialValues = {
  nom: "",
  chef_groupe: "",
  site: "" /*******************  check the value ***********************/,
};

const validationSchema = Yup.object().shape({
  nom: Yup.string().required("Required"),
  chef_groupe: Yup.string(),
  //
  // site
  //
});

const GroupeForm = () => {
  // const [files, setFiles] = useState(null)
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const [siteOptions, setSiteOptions] = useState({});

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(values));
      // if(files !== null)
      //     formData.append('files.image', files[0])

      const resp = await axios.post(
        `${API_URL}/groupes`,
        formData
        // values,
      );
      const data = await resp.data;
      // console.log("data: ", data)

      setSeverity("success");
      setMessage(`Msg: ${values.code} ${values.designation}`);
      setShowSnack(true);
    } catch (err) {
      console.log("err", err);
      setSeverity("error");
      setMessage("some error happened");
      setShowSnack(true);
    }
  };

  // const handleFileChange = event => {
  //     setFiles(event.target.files)
  // }

  //   const siteOptions = {};

  useEffect(async () => {
    //get sites
    const _sitesOptions = {};
    const sites = await getSites();
    for (const key in sites) {
      _sitesOptions[sites[key].id] = sites[key].nom;
    }
    console.log(sites);
    console.log(_sitesOptions);
    setSiteOptions(_sitesOptions);
  }, []);

  return (
    <div className={styles.Form} style={{ margin: 25 }}>
      <h3>Creation de Groupe</h3>
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
            <Textfield name="chef_groupe" label="Chef de Groupe" />
          </div>
          <div className={styles.formElement}>
            <Select
              name="site"
              label="Site"
              options={siteOptions}
              style={{ width: 250 }}
            />
          </div>

          <div className={styles.formElement}>
            <Button>Submit</Button>
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

export default GroupeForm;
