import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

function AuthLayout(props) {
  const { children } = props;

  return (
    <div className="root">
      <div className="auth-container">{children}</div>
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default AuthLayout;
