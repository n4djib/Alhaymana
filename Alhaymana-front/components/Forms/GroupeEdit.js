import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";

import Textfield from "../FormUI/Textfield";
import Button from "../FormUI/Button";
import Select from "../FormUI/Select";
import { updateGroupe, getSites } from "../../utils/apis";
import StyledGridItem from "../FormUI/StyledGridItem";

import styles from "../../styles/FormElements.module.css";

const validationSchema = Yup.object().shape({
  nom: Yup.string().required("Required"),
  chef_groupe: Yup.string(),
  // site: Yup.required("Required"),
});

// const initializeFormik = (record) => {
//   initialValues.nom = record.nom;
//   initialValues.chef_groupe = record.chef_groupe;
//   initialValues.site = record.site;
// };

const GroupeEdit = ({ groupe, snack }) => {
  const [siteOptions, setSiteOptions] = useState({});
  // const [, setRefresh] = useState(false);

  console.log("groupe", groupe);

  const initialValues = {
    nom: groupe.nom,
    chef_groupe: groupe.nom,
    site: groupe.site ? groupe.site.id : null,
  };

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

      const data = await updateGroupe(groupe.id, formData);
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
              <Button>Soumettre la modification</Button>
            </StyledGridItem>
          </Grid>
        </Form>
      </Formik>
    </div>
  );
};

export default GroupeEdit;
