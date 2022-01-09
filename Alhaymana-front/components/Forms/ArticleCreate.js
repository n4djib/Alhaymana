import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Textfield from "../FormUI/Textfield";
import Button from "../FormUI/Button";
import FileUploader from "../FormUI/FileUploader";
import { createArticle } from "../../utils/apis";

import styles from "../../styles/FormElements.module.css";

const initialValues = {
  code: "",
  designation: "",
};

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Required"),
  designation: Yup.string().required("Required"),
});

const ArticleCreate = ({ snack }) => {
  const [files, setFiles] = useState(null);

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(values));
      if (files !== null) formData.append("files.image", files[0]);

      console.log("formData:", formData);

      const data = await createArticle(formData);
      snack("success", "Soumettre avec succès", false);
    } catch (e) {
      snack("error", "some error happened", true);
    }
  };

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  return (
    <div className={styles.Form}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <Form>
          <div className={styles.formElement}>
            <Textfield name="code" label="Code" />
          </div>
          <div className={styles.formElement}>
            <Textfield name="designation" label="Designation" />
          </div>
          <div className={styles.formElement}>
            <FileUploader
              legend="Image d'article"
              handleChange={handleFileChange}
            />
          </div>
          <div className={styles.formElement}>
            <Button>Soumettre</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ArticleCreate;
