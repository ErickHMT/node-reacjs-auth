import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

function Auth(props) {
  const { children } = props;

  return (
    <div className="root">
      <div className="auth-container">{children}</div>
    </div>
  );
}

Auth.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Auth;
