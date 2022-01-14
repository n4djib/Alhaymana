import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";

import Textfield from "../FormUI/Textfield";
import Button from "../FormUI/Button";
import Select from "../FormUI/Select";
import { createGroupe, getSites } from "../../utils/apis";
import StyledGridItem from "../FormUI/StyledGridItem";

import styles from "../../styles/FormElements.module.css";

const initialValues = {
  nom: "",
  chef_groupe: "",
  site: null,
};

const validationSchema = Yup.object().shape({
  nom: Yup.string().required("Required"),
  chef_groupe: Yup.string(),
  // site: Yup.required("Required"),
});

const GroupeCreate = ({ snack }) => {
  const [siteOptions, setSiteOptions] = useState({});

  //get sites
  useEffect(async () => {
    const _sitesOptions = {};
    const sites = await getSites();
    for (const key in sites) {
      _sitesOptions[sites[key].id] = sites[key].nom;
    }
    setSiteOptions(_sitesOptions);
  }, []);

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(values));
      // if (files !== null) formData.append("files.image", files[0]);

      const data = await createGroupe(formData);
      snack("success", "Soumettre avec succès", false);
    } catch (e) {
      snack("error", "some error happened", true);
      console.log("e: ", e);
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
              <Textfield name="nom" label="Nom" />
            </StyledGridItem>
            <StyledGridItem item xs={12}>
              <Textfield name="chef_groupe" label="Chef de Groupe" />
            </StyledGridItem>
            <StyledGridItem item xs={12}>
              <Select
                name="site"
                label="Site"
                options={siteOptions}
                style={{ width: 270 }}
              />
            </StyledGridItem>

            <StyledGridItem item xs={12}>
              <Button>Soumettre</Button>
            </StyledGridItem>
          </Grid>
        </Form>
      </Formik>
    </div>
  );
};

export default GroupeCreate;
