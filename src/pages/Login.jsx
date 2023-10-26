import { useContext, useState } from "react"
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/authService";
import "../index.css";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser} = useContext(AuthContext)

  const navigate = useNavigate()

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    post('/auth/login', requestBody)
      .then((response) => {
        console.log('Found User ===>', response)
        console.log('JWT token ===>', response.data.authToken);
        storeToken(response.data.authToken)
        authenticateUser()
        navigate('/profile');
      })
      .catch((err) => {
        const errorDescription = err.response.data.message
        setErrorMessage(errorDescription);
      })
  }

  return (
    <div className="LoginPage container commonPage">
      <h1 className="text-center">Login</h1>

      <form onSubmit={handleLoginSubmit} className="my-4">
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>

      { errorMessage && <p className="text-danger">{errorMessage}</p> }

      <p>Don't have an account yet?</p>
      <Link to="/" className="text-primary">Sign up</Link>
    </div>
  );
}

export default Login