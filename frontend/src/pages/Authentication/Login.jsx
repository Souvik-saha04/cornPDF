import { useState } from "react";
import "./Login.css";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.448 14.013 17.64 11.803 17.64 9.2z" fill="#4285F4" />
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.183l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853" />
    <path d="M3.964 10.708A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.708V4.96H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.04l3.007-2.332z" fill="#FBBC05" />
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.96L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
  </svg>
);

export default function Login({ onNavigate }) {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login logic here
  };

  return (
    <div className="login-page">
      <div className="login-glow" />

      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">🌽</div>
          corn<span className="login-logo-accent">PDF</span>
        </div>

        <h1 className="login-title">Welcome back</h1>
        <p className="login-subtitle">Log in to your account to continue</p>

        <button className="login-google-btn" type="button">
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="login-divider">or sign in with username</div>

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label" htmlFor="login-username">Username</label>
            <input
              id="login-username"
              className="login-input"
              type="text"
              name="username"
              placeholder="your_username"
              autoComplete="username"
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="login-password">Password</label>
            <input
              id="login-password"
              className="login-input"
              type="password"
              name="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="login-meta-row">
            <button type="button" className="login-forgot">Forgot password?</button>
          </div>

          <button className="login-primary-btn" type="submit">Log In</button>
        </form>

        <p className="login-footer">
          Don't have an account?{" "}
          <button className="login-footer-link" onClick={() => onNavigate?.("signup")}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}