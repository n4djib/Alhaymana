import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";

import Textfield from "../FormUI/Textfield";
import Button from "../FormUI/Button";
import { createSite } from "../../utils/apis";
import StyledGridItem from "../FormUI/StyledGridItem";

import styles from "../../styles/FormElements.module.css";

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

const SiteCreate = ({ snack }) => {
  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(values));
      // if (files !== null) formData.append("files.image", files[0]);

      console.log("formData:", formData);

      const data = await createSite(formData);
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
              <Textfield name="adresse" label="Adresse" />
            </StyledGridItem>
            <StyledGridItem item xs={12}>
              <Textfield name="chef_site" label="Chef Site" />
            </StyledGridItem>
            <StyledGridItem item xs={12} md={6}>
              <Textfield name="gps_latitude" label="GPS Latitude" />
            </StyledGridItem>
            <StyledGridItem item xs={12} md={6}>
              <Textfield name="gps_longitude" label="GPS Longitude" />
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

export default SiteCreate;
