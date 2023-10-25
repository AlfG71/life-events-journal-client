import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { post } from "../services/authService";

const AddChild = ({ setAddChild }) => { // convert to false on click
  const { user, setUser, storeToken } = useContext(AuthContext);

  const [childData, setChildData] = useState({
    name: "",
    dateOfBirth: "",
    image: "",
  });

  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChildData({ ...childData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post('/child/create', childData)
      .then((res) => {
        console.log('Created Child ===>', res.data.user);
        console.log('JWT token ===>', res.data.authToken)
        setAddChild(false);
        storeToken(res.data.authToken);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
        next(err);
      })
  };

  return (
    <div className="container mt-2 SignupPage commonPage w-1000">
    <h1 className="text-center">Add Child</h1>
    <form onSubmit={handleSubmit} className="my-4">
      <div className="mb-3">
        <label className="form-label">Name:</label>
        <input
          type="text"
          name="name"
          value={childData.name}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Date of Birth:</label>
        <input
          type="date"
          name="dateOfBirth"
          value={childData.dateOfBirth}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Image URL:</label>
        <input
          type="text"
          name="image"
          value={childData.image}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary">Add Child</button>
    </form>
    </div>
  );
};

export default AddChild;
