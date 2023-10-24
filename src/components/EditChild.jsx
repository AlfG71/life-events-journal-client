import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/authService";
import { useParams } from "react-router-dom";

const EditChild = ({ setIsEditing }) => {
  const { childId } = useParams();

  const { user } = useContext(AuthContext)

  console.log("Child Id ===>", childId)
  console.log("User ===>", user)

  const [editedChild, setEditedChild] = useState(null);

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditing(false);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedChild((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedUser = { ...user };

    const childIndex = updatedUser.children.find((child) => child.id === childId)

    updatedUser.children[childIndex] = {
      ...updatedUser.children[childIndex],
      ...editedChild,
    };

    post(`/child/edit-child/${childId}`, editedChild)
      .then((response) => {
        console.log('Updated User ===>', response.data.user);
        console.log('JWT token ===>', response.data.authToken);
        storeToken(response.data.authToken);
        setIsEditing(false); // Exit edit mode
        authenticateUser()
        navigate(`/child-profile/${childId}`);
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  useEffect(() => {
    if (user && user.children) {

      const childToEdit = user.children.find((child) => child._id === childId);

      if (childToEdit) {
        setEditedChild({
          name: childToEdit.name,
          dateOfBirth: childToEdit.dateOfBirth,
          img: childToEdit.img,
        });
      }
    }
  }, [user, childId]);

  return (
    <div className="EditProfilePage">
      <h1>Edit Child Profile</h1>

      {editedChild && (
        <form onSubmit={handleEditSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={editedChild.name}
            onChange={handleInputChange}
          />

          <label>Date of Birth:</label>
          <input
            type="text"
            name="dateOfBirth"
            value={editedChild.dateOfBirth}
            onChange={handleInputChange}
          />

          <label>Profile Image:</label>
          <input
            type="text"
            name="img"
            value={editedChild.img}
            onChange={handleInputChange}
          />

          <button to="/profile" type="submit" onClick={handleEditSubmit}>
            Save Changes
          </button>
        </form>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <Link to={`/child-profile/${childId}`} onClick={handleEditClick}>
        Back to Profile
      </Link>
    </div>
  );
}

export default EditChild