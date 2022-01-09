import React, { useState, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Textfield from "../../components/FormUI/Textfield";
import Button from "../../components/FormUI/Button";
import Snack from "../../components/UI/Snack";
import AuthContext from "../../contexts/AuthContext";
import styles from "../../styles/FormElements.module.css";

const initialValues = {
  email: "",
  password: "",
  // rememberMe: false,
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const signin = () => {
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const { user, loginUser } = useContext(AuthContext);

  const onSubmit = async (values) => {
    try {
      console.log("values:", values);
      await loginUser(values.email, values.password);
    } catch (err) {
      console.log("err", err);
      setSeverity("error");
      setMessage("some error happened");
      setShowSnack(true);
    }
  };

  return (
    <div className={styles.Form} style={{ margin: 25 }}>
      <h1>Signin*****</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <Form>
          <div className={styles.formElement}>
            <Textfield
              name="email"
              label="Email"
              // autoComplete="new-off"
              // autoComplete="nope"
            />
          </div>
          <div className={styles.formElement}>
            <Textfield
              type="password"
              name="password"
              label="Password"
              // autoComplete="new-off"
            />
          </div>

          <div className={styles.formElement}>
            <Button>Signin******</Button>
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

export default signin;
