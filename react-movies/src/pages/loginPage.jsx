import React, { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const context = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    context.authenticate(userName, password);
  };

  let location = useLocation();

  //set where we came from
  const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

  if (context.isAuthenticated) {
    return <Navigate to={from} />;
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
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#fff' }}>Login</h2>
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
          <button
            onClick={login}
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
            Log In
          </button>
          <p style={{ textAlign: 'center', color: '#999', fontSize: '14px' }}>
            Don't have an account? <Link to="/signup" style={{ color: '#e50914', textDecoration: 'none' }}>Sign up</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
