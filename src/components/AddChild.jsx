import { useState, useContext, useNavigate } from "react";
import { AuthContext } from "../context/auth.context";
import { post } from "../services/authService";
import { Link, Navigate } from "react-router-dom";

import { photo } from "../services/photo";

const AddChild = ({ setAddChild }) => { // convert to false on click
  const { user, setUser, storeToken } = useContext(AuthContext);

  const [childData, setChildData] = useState({
    name: "",
    dateOfBirth: "",
    img: "",
  });

  const [errorMessage, setErrorMessage] = useState(undefined);

  const [buttonDisabled, setButtonDisabled] = useState(false)

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

  const handlePhotoChange = (e) => {
    setButtonDisabled(true)

        photo(e)
          .then((response) => {
            console.log("Response ===> ", response.data);
            setChildData((prev) => ({...prev, [e.target.name]: response.data.image}));
            setButtonDisabled(false);
          })
          .catch((err) => {
            setButtonDisabled(false);
            console.log("Error while uploading the file: ", err);
          });
  }

  return (
    <div className="container mt-2 SignupPage">
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
          type="file"
          name="img"
          onChange={handlePhotoChange}
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary">Add Child</button>
      <Link className="btn btn-secondary me-2" to="/profile" onClick={() => {Navigate("/profile/childId")}}>
          Cancel
      </Link>
    </form>
    </div>
  );
};

export default AddChild;
