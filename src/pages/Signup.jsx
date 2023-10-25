import { useState, useContext } from "react"
import { Link, useNavigate, Route } from "react-router-dom"

import { AuthContext } from "../context/auth.context";

import { post } from "../services/authService";
import '../index.css';






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
    <div className="SignupPage container commonPage"> 
      <h1 className="text-center">Create an account</h1> 

      <form onSubmit={handleSignupSubmit} className="my-4"> 
        <div className="mb-3"> 
          <label className="form-label">User Name</label> 
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={handleUserName}
            className="form-control"   
          />
        </div>

        <div className="mb-3"> 
          <label className="form-label">Email</label> 
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            className="form-control"  
          />
        </div>

        <div className="mb-3"> 
          <label className="form-label">Password</label> 
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            className="form-control "  
          />
        </div>

        <button type="submit" className="btn btn-primary">Create account</button>
      </form>

      { errorMessage && <p className="text-danger">{errorMessage}</p> } 

      <p>Already have an account?</p>
      <Link to="/login" className="text-primary">Login</Link> 
    </div>
  );
};

export default Signup