import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/authService";

const EditProfile = ({ user, setIsEditing }) => {
  console.log(user)

  const [editedUser, setEditedUser] = useState(null); //Initialize editedUser with the user's data
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditing(false);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    post('/users/update', editedUser)
      .then((response) => {
        console.log('Updated User ===>', response.data.user);
        console.log('JWT token ===>', response.data.authToken);
        storeToken(response.data.authToken);
        setIsEditing(false); // Exit edit mode
        authenticateUser()
        navigate('/profile');
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  };


  useEffect(() => {
    if(user) {
      const { userName, email, img } = user
      setEditedUser({
        userName,
        email,
        img
      })
    }
  }, [user])

  return (
    <div className="EditProfilePage">
      <h1>Edit Profile</h1>

{editedUser &&
        <form onSubmit={handleEditSubmit}>
          <label>User Name:</label>
          <input
            type="text"
            name="userName"
            value={editedUser.userName}
            onChange={handleInputChange}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
          />

          <label>Profile Image:</label>
          <input
            type="text"
            name="img"
            value={editedUser.img}
            onChange={handleInputChange}
          />

          <button to='/profile' type="submit" onClick={handleEditSubmit}>
            Save Changes
          </button>
        </form>

}


      {errorMessage && <p className="error-message">{errorMessage}</p> }

      <Link to="/profile" onClick={handleEditClick}>Back to Profile</Link>
    </div>
  );
};

export default EditProfile;
