import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = e => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Email e senha devem estar preenchidos");
    }

    console.log(email, password);
  };

  return (
    <>
      <h2 className="login-title">Welcome back :)</h2>

      <form onSubmit={handleLogin}>
        <div className="input-container">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <div style={{ textAlign: "right" }}>
          <Link className="forgot-password" to="/password/new">
            Esqueceu sua senha?
          </Link>
        </div>

        <button className="btn btn-primary btn-large btn-login" type="submit">
          Login
        </button>
        <hr />
        <p>
          Ainda não possui uma conta?
          <Link to="/signup"> Registre-se agora</Link>
        </p>
      </form>

      {/* <a id="github-button" class="btn btn-block btn-social btn-github">
        <i class="fa fa-github"></i> Sign in with GitHub
      </a> */}
    </>
  );
}
