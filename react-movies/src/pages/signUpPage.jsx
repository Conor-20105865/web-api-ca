import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const context = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);

  const register = () => {
    let passwordValid = true;
    if (password.length < 8) {
      passwordValid = false;
    }
    if (password !== passwordAgain) {
      passwordValid = false;
    }
    //pass requirments
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      passwordValid = false;
    }

    if (passwordValid) {
      context.register(userName, password);
      setRegistered(true);
    }
  };

  if (registered) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '80vh',
        padding: '20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#1e1e1e'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#fff' }}>Sign Up</h2>
          <div style={{ marginBottom: '20px' }}>
            <input
              id="username"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #444',
                backgroundColor: '#2a2a2a',
                color: '#fff',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #444',
                backgroundColor: '#2a2a2a',
                color: '#fff',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <input
              id="password-again"
              type="password"
              placeholder="Confirm Password"
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #444',
                backgroundColor: '#2a2a2a',
                color: '#fff',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <p style={{ fontSize: '12px', color: '#999', marginBottom: '15px' }}>
            Password must be at least 8 characters with a letter, number, and special character (@$!%*#?&)
          </p>
          <button
            onClick={register}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#e50914',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '15px'
            }}
          >
            Sign Up
          </button>
          <p style={{ textAlign: 'center', color: '#999', fontSize: '14px' }}>
            Already have an account? <Link to="/login" style={{ color: '#e50914', textDecoration: 'none' }}>Log in</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
