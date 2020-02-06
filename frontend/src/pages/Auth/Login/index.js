import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "./styles.css";
import api from "../../../services/api";
import { login } from "../../../services/auth";

const validations = yup.object().shape({
  email: yup
    .string()
    .email("E-mail inválido")
    .required("Campo obrigatório"),
  password: yup
    .string()
    .min(6, "senha deve possuir ao menos 6 caracteres")
    .required("Campo obrigatório")
});

export default function Login(props) {
  const { history } = props;

  const handleLogin = async (values, actions) => {
    try {
      const response = await api.post("/auth/login", values);
      login(response.data.token);
      history.push("/feed");
    } catch (err) {
      console.warn("error: ", err);
    }
  };

  return (
    <>
      <h2 className="login-title">Welcome back :)</h2>
      <hr />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
        validationSchema={validations}
      >
        <FormikForm>
          <div className="input-container">
            <label htmlFor="email">E-mail</label>
            <Field name="email" type="email" />
            <span className="error-message">
              <ErrorMessage name="email" />
            </span>
          </div>

          <div className="input-container">
            <label htmlFor="password">Senha</label>
            <Field name="password" type="password" />
            <span className="error-message">
              <ErrorMessage name="password" />
            </span>
          </div>

          <div className="forgot-password">
            <Link to="/reset-password">Esqueceu sua senha?</Link>
          </div>

          <button className="btn btn-primary btn-large btn-login" type="submit">
            Login
          </button>
          <hr />
          <p>
            Ainda não possui uma conta?
            <Link to="/signup"> Registre-se agora</Link>
          </p>
        </FormikForm>
      </Formik>
    </>
  );
}
