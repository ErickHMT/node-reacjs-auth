import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");

  function handleResetPassword(e) {
    e.preventDefault();

    console.log(email);
  }

  return (
    <>
      <h2 className="login-title">Reset Password</h2>

      <form onSubmit={handleResetPassword}>
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

        <button className="btn btn-primary btn-large btn-login" type="submit">
          Reset password
        </button>
      </form>

      <hr />
      <p>
        Já possui uma conta?
        <Link to="/login"> Realizar login</Link>
      </p>
    </>
  );
}
