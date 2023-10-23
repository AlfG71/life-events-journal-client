import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate} from "react-router-dom";
import { post } from "../services/authService";

const AddChild = ({ setAddChild }) => { // convert to false on click
  const { user, setUser, storeToken } = useContext(AuthContext);

  const [childData, setChildData] = useState({
    name: "",
    dateOfBirth: "",
    image: "",
  });

  const navigate = useNavigate();
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
    <div>
      <h1>Add Child</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={childData.name}
          onChange={handleInputChange}
        />

        <label>Date of Birth:</label>
        <input
          type="text"
          name="dateOfBirth"
          value={childData.dateOfBirth}
          onChange={handleInputChange}
        />

        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={childData.image}
          onChange={handleInputChange}
        />

        <button type="submit">Add Child</button>
      </form>
    </div>
  );
};

export default AddChild;
