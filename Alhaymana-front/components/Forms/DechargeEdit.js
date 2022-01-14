import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";

import Textfield from "../FormUI/Textfield";
import Button from "../FormUI/Button";
import Select from "../FormUI/Select";
import DatePicker from "../FormUI/DatePicker";
import { updateDecharge, getArticles } from "../../utils/apis";
import StyledGridItem from "../FormUI/StyledGridItem";

import styles from "../../styles/FormElements.module.css";

// const initializeFormik = (record) => {
//   initialValues.code = record.code;
//   initialValues.designation = record.designation;
// };

const DechargeEdit = ({ decharge, snack }) => {
  const [articleOptions, setArticleOptions] = useState({});

  // console.log("");
  // console.log("DechargeEdit decharge: ", decharge);
  // console.log("");

  const initialValues = {
    matricule: decharge.matricule,
    date: decharge.date,
    article: decharge.articleId,
    // agent: ,  // we don't change the agent
  };

  const validationSchema = Yup.object().shape({
    // code: Yup.string().required("Required"),
    // designation: Yup.string().required("Required"),
  });

  useEffect(async () => {
    const _articlesOptions = {};
    const articles = await getArticles();
    for (let key in articles) {
      _articlesOptions[articles[key].id] = articles[key].code;
    }
    await setArticleOptions(_articlesOptions);
  }, []);

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(values));
      // if (files !== null) formData.append("files.image", files[0]);

      const data = await updateDecharge(decharge.id, formData);
      snack("success", "Soumettre avec succès", false);
    } catch (e) {
      console.log(e);
      snack("error", "some error happened", true);
    }
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
              <Select
                name="article"
                label="Article"
                options={articleOptions}
                style={{ width: 245 }}
              />
            </StyledGridItem>
            <StyledGridItem item xs={12}>
              <Textfield name="matricule" label="Matricule (Code Interne)" />
            </StyledGridItem>
            <StyledGridItem item xs={12}>
              <DatePicker name="date" label="Date" />
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

export default DechargeEdit;
