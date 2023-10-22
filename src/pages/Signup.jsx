import { useState } from "react"

const Signup = () => {
  const [userName, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // code to handle event
  }


  return (
    <div>
      <h1>Create an account</h1>
    </div>

  )
}

export default Signup