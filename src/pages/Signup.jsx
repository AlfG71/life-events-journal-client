import { useState, useContext } from "react"
import { Link, useNavigate, Route } from "react-router-dom"

import { AuthContext } from "../context/auth.context";

import { post } from "../services/authService";


const Signup = () => {
  const [userName, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { authenticateUser, storeToken } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleUserName = (e) => setuserName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { userName, email, password };
    console.log(requestBody);

    post('/auth/signup', requestBody)
      .then((response) => {
        console.log("Created user ==>", response.data)
        console.log("Token ===>", response.data.authToken)
        storeToken(response.data.authToken)
        authenticateUser()
        navigate('/profile');
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      })
  }


  return (
    <div className="SignupPage">
      <h1>Create an account</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>User Name</label>
        <input
          type="text"
          name="userName"
          value={userName}
          onChange={handleUserName}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Create account</button>
      </form>

      { setErrorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Already have an account?</p>
        <Link to="/login">Login</Link>
    </div>

  )
}

export default Signup