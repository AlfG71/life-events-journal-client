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
    <div className="EditProfilePage mt-5  container">
    <h1 className="text-center mb-4">Edit Profile</h1>

    {editedUser && (
        <form onSubmit={handleEditSubmit} className="my-4">
            <div className="mb-3">
                <label className="form-label">User Name:</label>
                <input
                    type="text"
                    name="userName"
                    value={editedUser.userName}
                    onChange={handleInputChange}
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Profile Image:</label>
                <input
                    type="text"
                    name="img"
                    value={editedUser.img}
                    onChange={handleInputChange}
                    className="form-control"
                />
            </div>

            <button 
                to="/profile" 
                type="submit" 
                onClick={handleEditSubmit} 
                className="btn btn-primary mb-3">
                Save Changes
            </button>
        </form>
    )}

    {errorMessage && <p className="error-message text-danger mt-2">{errorMessage}</p>}

    <Link to="/profile" onClick={handleEditClick} className="btn btn-secondary btn-lg">
        Back to Profile
    </Link>
</div>

  );
};

export default EditProfile;
