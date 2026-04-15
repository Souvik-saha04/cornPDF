import { useState } from "react";
import "./Signup.css";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.448 14.013 17.64 11.803 17.64 9.2z" fill="#4285F4" />
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.183l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853" />
    <path d="M3.964 10.708A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.708V4.96H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.04l3.007-2.332z" fill="#FBBC05" />
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.96L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
  </svg>
);

function getStrength(pwd) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  const widths = ["0%", "28%", "52%", "76%", "100%"];
  const colors = ["#f5c518", "#f5a018", "#f5c518", "#8bc34a", "#4caf50"];
  return { width: widths[score], background: colors[score] };
}

export default function Signup({ onNavigate }) {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: "",
  });
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle signup logic here
  };

  const strength = getStrength(form.password);

  return (
    <div className="signup-page">
      <div className="signup-glow" />

      <div className="signup-card">
        {/* Logo */}
        <div className="signup-logo">
          <div className="signup-logo-icon">🌽</div>
          corn<span className="signup-logo-accent">PDF</span>
        </div>

        <h1 className="signup-title">Create your account</h1>
        <p className="signup-subtitle">Start exploring your documents with AI</p>

        {/* Google */}
        <button className="signup-google-btn" type="button">
          <GoogleIcon />
          Sign up with Google
        </button>

        <div className="signup-divider">or sign up with email</div>

        <form onSubmit={handleSubmit}>
          {/* Name row */}
          <div className="signup-row-2">
            <div className="signup-field">
              <label className="signup-label" htmlFor="su-fname">First Name</label>
              <input
                id="su-fname"
                className="signup-input"
                type="text"
                name="fname"
                placeholder="Jane"
                autoComplete="given-name"
                value={form.fname}
                onChange={handleChange}
              />
            </div>
            <div className="signup-field">
              <label className="signup-label" htmlFor="su-lname">Last Name</label>
              <input
                id="su-lname"
                className="signup-input"
                type="text"
                name="lname"
                placeholder="Doe"
                autoComplete="family-name"
                value={form.lname}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="signup-field">
            <label className="signup-label" htmlFor="su-email">Email</label>
            <input
              id="su-email"
              className="signup-input"
              type="email"
              name="email"
              placeholder="jane@example.com"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="signup-field">
            <label className="signup-label" htmlFor="su-username">Username</label>
            <input
              id="su-username"
              className="signup-input"
              type="text"
              name="username"
              placeholder="jane_doe"
              autoComplete="username"
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div className="signup-field">
            <label className="signup-label" htmlFor="su-password">Password</label>
            <input
              id="su-password"
              className="signup-input"
              type="password"
              name="password"
              placeholder="••••••••"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
            />
            <div className="signup-strength-bar">
              <div
                className="signup-strength-fill"
                style={{ width: strength.width, background: strength.background }}
              />
            </div>
          </div>

          {/* Terms */}
          <div className="signup-terms">
            <input
              type="checkbox"
              id="su-agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="su-agree">
              I agree to the{" "}
              <span className="signup-terms-link">Terms of Service</span> and{" "}
              <span className="signup-terms-link">Privacy Policy</span>
            </label>
          </div>

          <button className="signup-primary-btn" type="submit">
            Create Account
          </button>
        </form>

        <p className="signup-footer">
          Already have an account?{" "}
          <button
            className="signup-footer-link"
            onClick={() => onNavigate?.("login")}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}