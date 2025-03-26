// LoginForm.jsx
import React from "react";

const LoginForm = ({ email, password, onChange }) => {
  const isDisabled = !email || !password;
  return (
    <form>
      <input data-testid="email-input" type="email" value={email} onChange={(e) => onChange("email", e.target.value)} />
      <input data-testid="password-input" type="password" value={password} onChange={(e) => onChange("password", e.target.value)} />
      <button disabled={isDisabled}>Đăng nhập</button>
    </form>
  );
};

export default LoginForm;
