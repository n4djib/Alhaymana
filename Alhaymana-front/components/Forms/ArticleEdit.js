import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";

import Textfield from "../FormUI/Textfield";
import Button from "../FormUI/Button";
import FileUploader from "../FormUI/FileUploader";
import { updateArticle } from "../../utils/apis";
import StyledGridItem from "../FormUI/StyledGridItem";

import styles from "../../styles/FormElements.module.css";

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Required"),
  designation: Yup.string().required("Required"),
});

// const initializeFormik = (record) => {
//   initialValues.code = record.code;
//   initialValues.designation = record.designation;
// };

const ArticleEdit = ({ article, snack }) => {
  const [files, setFiles] = useState(null);

  const initialValues = {
    code: article.code,
    designation: article.designation,
    file: "",
  };
  // useEffect(() => {
  //   initializeFormik(article);
  // }, []);

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(values));
      if (files !== null) formData.append("files.image", files[0]);

      const data = await updateArticle(article.id, formData);

      snack("success", "Soumettre avec succès", false);
    } catch (e) {
      console.log(e);
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
          <Grid container>
            <StyledGridItem item xs={12}>
              <Textfield name="code" label="Code" />
            </StyledGridItem>
            <StyledGridItem item xs={12}>
              <Textfield name="designation" label="Designation" />
            </StyledGridItem>
            <StyledGridItem item xs={12}>
              <FileUploader
                legend="Image d'article"
                handleChange={handleFileChange}
                image={article.image}
              />
            </StyledGridItem>
            <StyledGridItem item xs={12}>
              <Button>Soumettre la modification</Button>
            </StyledGridItem>
          </Grid>
        </Form>
      </Formik>
    </div>
  );
};

export default ArticleEdit;
