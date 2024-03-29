import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/authService";
import { useParams } from "react-router-dom";

import { photo } from "../services/photo";

const EditChild = ({ setIsEditing }) => {
  const { childId } = useParams();

  const { user } = useContext(AuthContext)

  // console.log("Child Id ===>", childId)
  // console.log("User ===>", user)

  const [editedChild, setEditedChild] = useState(null);

  const [errorMessage, setErrorMessage] = useState(undefined);

  const [buttonDisabled, setButtonDisabled] = useState(false)

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

  const handlePhotoChange = (e) => {
    setButtonDisabled(true)

        photo(e)
          .then((response) => {
            console.log(response.data);
            setEditedChild((prev) => ({...prev, [e.target.name]: response.data.image}));
            setButtonDisabled(false);
          })
          .catch((err) => {
            setButtonDisabled(false);
            console.log("Error while uploading the file: ", err);
          });
  }

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
<div className="container mt-5 EditProfilePage">
  <div className="card small-card">
    <div className="card-header bg-primary text-white">
      <h1>Edit Child Profile</h1>
    </div>
    <div className="card-body">
      {editedChild && (
        <form onSubmit={handleEditSubmit}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={editedChild.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Birth:</label>
            <input
              type="text"
              className="form-control"
              name="dateOfBirth"
              value={editedChild.dateOfBirth}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Profile Image:</label>
            <input
              type="file"
              className="form-control"
              name="img"
              onChange={handlePhotoChange}
            />
          </div>
          <button
            className="btn btn-success"
            to="/profile"
            type="submit"
            onClick={handleEditSubmit}
            disabled={buttonDisabled}
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
    <div className="card-footer">
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <Link className="btn btn-secondary" to={`/child-profile/${childId}`} onClick={handleEditClick}>
        Back to Profile
      </Link>
    </div>
  </div>
</div>
  );
}

export default EditChild