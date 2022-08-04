import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as sessionActions from "../utils/session";

import './auth.css';

export default function Auth() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);


  const handleLogin = async (e) => {

    e.preventDefault();
    setErrors([]);

    const userCreds = {
      username: username.trim(),
      password: password.trim()
    }

    await sessionActions.login(userCreds)
      .catch(async (res) => {
        const data = await res.json();

        if (data && data.errors) setErrors(data.errors);
        else navigate('/node-cms/dashboard');
      });

  };



  return (
    
    <div className="auth-cont">

        <h1>Node-CMS</h1>
      <form className="auth-form" onSubmit={handleLogin}>

        <ul>
          {errors.map((error, i) => <li key={i}>{error}</li>)}
        </ul>

        <div>
          <label htmlFor="username"></label>
          <input
            className="auth-input"
            name="username"
            type="text"
            placeholder="Username"
            maxLength='32'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password"></label>
          <input 
            className="auth-input"
            name="password"
            type="password"
            placeholder="Password"
            maxLength='64'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
        
      </form>
    </div>


  )



}