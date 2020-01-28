import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function handleSignUp(e) {
    e.preventDefault();
  }

  return (
    <>
      <h2 className="login-title">Crie sua conta</h2>

      <form onSubmit={handleSignUp}>
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
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            onChange={e => setName(e.target.value)}
            value={name}
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

        <button className="btn btn-primary btn-large btn-login" type="submit">
          Cadastrar
        </button>
      </form>

      <Link to="/login">Realizar login</Link>
    </>
  );
}
