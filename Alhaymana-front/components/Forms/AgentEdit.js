import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import Textfield from "../FormUI/Textfield";
import Button from "../FormUI/Button";
import FileUploader from "../FormUI/FileUploader";
import DatePicker from "../FormUI/DatePicker";
import Select from "../FormUI/Select";
import { getAgents, updateAgent } from "../../utils/apis";
import {
  situation_familiale_options,
  sexe_options,
  groupe_sanguin_options,
} from "../../utils/constants";

import styles from "../../styles/FormElements.module.css";

const FormTextfield = (props) => (
  <div className={styles.formElement}>
    <Textfield {...props} />
  </div>
);

const FormDateTimePicker = (props) => (
  <div className={styles.formElement}>
    <DateTimePicker {...props} />
  </div>
);

const FormSelect = (props) => (
  <div className={styles.formElement}>
    <Select {...props} />
  </div>
);

const StyledGridItem = styled(Grid)(({ theme }) => ({
  padding: 5,
}));

const mat_list = [];
const cin_list = [];
const cnas_list = [];
const acte_list = [];
const email_list = [];

const fill_unique_lists = (agents, current_agent) => {
  for (const agent of agents) {
    if (agent.id === current_agent.id) continue;

    const matricule = agent.matricule;
    const cin = agent.cin;
    const cnas = agent.cnas;
    const acte = agent.num_acte_naissance;
    const email = agent.email;

    if (matricule && !mat_list.includes(matricule)) mat_list.push(matricule);
    if (cin && !cin_list.includes(cin)) cin_list.push(cin);
    if (cnas && !cnas_list.includes(cnas)) cnas_list.push(cnas);
    if (acte && !acte_list.includes(acte)) acte_list.push(acte);
    if (email && !email_list.includes(email)) email_list.push(email);
  }
};

const initialValues = {
  // matricule: "",
  // nom: "",
  // prenom: "",
  // nom_arab: "",
  // prenom_arab: "",
  // date_naissance: null,
  // lieu_naissance: "",
  // cin: "",
  // cin_delivrer_par: "",
  // cin_delivrer_le: null,
  // cnas: "",
  // num_acte_naissance: "",
  // telephone: "",
  // telephone2: "",
  // adresse: "",
  // email: "",
  // prenom_pere: "",
  // nom_prenom_mere: "",
  // // photo: "",
  // situation_familiale: null,
  // sexe: null,
  // groupe_sanguin: null,
};

const initializeFormik = (record) => {
  initialValues.matricule = record.matricule;
  initialValues.nom = record.nom;
  initialValues.prenom = record.prenom;
  initialValues.nom_arab = record.nom_arab;
  initialValues.prenom_arab = record.prenom_arab;
  initialValues.date_naissance = record.date_naissance;
  initialValues.lieu_naissance = record.lieu_naissance;
  initialValues.cin = record.cin;
  initialValues.cin_delivrer_par = record.cin_delivrer_par;
  initialValues.cin_delivrer_le = record.cin_delivrer_le;
  // initialValues.photo = record.photo;
  initialValues.cnas = record.cnas;
  initialValues.num_acte_naissance = record.num_acte_naissance;
  initialValues.telephone = record.telephone;
  initialValues.telephone2 = record.telephone2;
  initialValues.adresse = record.adresse;
  initialValues.email = record.email;
  initialValues.prenom_pere = record.prenom_pere;
  initialValues.nom_prenom_mere = record.nom_prenom_mere;
  initialValues.situation_familiale = record.situation_familiale;
  initialValues.sexe = record.sexe;
  initialValues.groupe_sanguin = record.groupe_sanguin;
};

const AgentEdit = ({ agent, snack }) => {
  const [files, setFiles] = useState(null);
  const [, setRefresh] = useState(false);

  const validationSchema = Yup.object().shape({
    matricule: Yup.string()
      .required("Required")
      .notOneOf(mat_list, "Must be unique"),
    nom: Yup.string().required("Required"),
    prenom: Yup.string().required("Required"),
    //
    // date_naissance: Yup.
    cin: Yup.string().required("Required").notOneOf(cin_list, "Must be unique"),
    cnas: Yup.string()
      .required("Required")
      .notOneOf(cnas_list, "Must be unique"),
    num_acte_naissance: Yup.string()
      .required("Required")
      .notOneOf(acte_list, "Must be unique"),
    // photo: Yup.string().required('Required'),
  });

  useEffect(async () => {
    const agents = await getAgents();
    await fill_unique_lists(agents, agent);
    await initializeFormik(agent);
    await setRefresh(true);
  }, []);

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(values));
      if (files !== null) formData.append("files.photo", files[0]);

      const data = await updateAgent(agent.id, formData);
      snack("success", "Modifier avec succès", false);
    } catch (e) {
      console.log(e);
      snack("error", "some error happened", true);
    }
  };

  const handlePhotoChange = (event) => {
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
            <StyledGridItem item xs={12} sm={12} md={3}>
              <Textfield name="matricule" label="Matricule *" />
            </StyledGridItem>
            <StyledGridItem item xs={12} sm={6} md={4}>
              <Textfield name="nom" label="Nom *" />
            </StyledGridItem>
            <StyledGridItem item xs={12} sm={6} md={5}>
              <Textfield name="prenom" label="Prenom *" />
            </StyledGridItem>
            <StyledGridItem item xs={12} sm={6} md={6}>
              <Textfield name="prenom_arab" label="الاسم بالعربي" dir="rtl" />
            </StyledGridItem>
            <StyledGridItem item xs={12} sm={6} md={6}>
              <Textfield name="nom_arab" label="اللقب بالعربي" dir="rtl" />
            </StyledGridItem>

            <StyledGridItem item xs={12}>
              <FileUploader
                legend="Photo d'agent"
                handleChange={handlePhotoChange}
                image={agent.photo}
              />
            </StyledGridItem>

            <StyledGridItem item xs={12} sm={4} md={3}>
              <DatePicker name="date_naissance" label="Date Naissance" />
            </StyledGridItem>
            <StyledGridItem item xs={12} sm={8} md={9}>
              <Textfield name="lieu_naissance" label="Lieu Naissance" />
            </StyledGridItem>

            <StyledGridItem item xs={12} sm={4} md={4}>
              <Textfield name="cin" label="CIN *" />
            </StyledGridItem>
            <StyledGridItem item xs={12} sm={4} md={4}>
              <Textfield name="cin_delivrer_par" label="CIN Delivrer par" />
            </StyledGridItem>
            <StyledGridItem item xs={12} sm={4} md={4}>
              <DatePicker name="cin_delivrer_le" label="CIN Delivrer le" />
            </StyledGridItem>
            <StyledGridItem item xs={12} sm={6} md={6}>
              <Textfield name="cnas" label="CNAS *" />
            </StyledGridItem>
            <StyledGridItem item xs={12} sm={6} md={6}>
              <Textfield
                name="num_acte_naissance"
                label="Numéro Acte de Naissance *"
              />
            </StyledGridItem>

            <StyledGridItem item xs={12} sm={6} md={6}>
              <Textfield name="email" label="Email" />
            </StyledGridItem>
            <StyledGridItem item xs={12} sm={6} md={6}>
              <Textfield name="adresse" label="Adresse" />
            </StyledGridItem>
            <StyledGridItem item xs={12} sm={6} md={6}>
              <Textfield name="telephone" label="telephone" />
            </StyledGridItem>
            <StyledGridItem item xs={12} sm={6} md={6}>
              <Textfield name="telephone2" label="telephone 2" />
            </StyledGridItem>
            <StyledGridItem item xs={12} sm={6} md={6}>
              <Textfield name="prenom_pere" label="Prenom de Pere" />
            </StyledGridItem>
            <StyledGridItem item xs={12} sm={6} md={6}>
              <Textfield name="nom_prenom_mere" label="Nom et Prenom de Mere" />
            </StyledGridItem>

            <StyledGridItem item xs={12}>
              <Select
                name="situation_familiale"
                label="Situation Familiale"
                options={situation_familiale_options}
                style={{ width: 270 }}
              />
            </StyledGridItem>
            <StyledGridItem item xs={12}>
              <Select
                name="sexe"
                label="Sexe *"
                options={sexe_options}
                style={{ width: 270 }}
              />
            </StyledGridItem>
            <StyledGridItem item xs={12}>
              <Select
                name="groupe_sanguin"
                label="Groupe Sanguin *"
                options={groupe_sanguin_options}
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

export default AgentEdit;
