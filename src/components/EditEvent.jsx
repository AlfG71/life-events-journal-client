import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { post } from "../services/authService";
import { useParams } from "react-router-dom";

import { photo } from "../services/photo";

const EditEvent = ({ setIsEditing }) => {
  const { childId, eventId } = useParams();
  const { user, storeToken, authenticateUser } = useContext(AuthContext); // added setUser, storeToken

  const [editedEvent, setEditedEvent] = useState(null);

  const [errorMessage, setErrorMessage] = useState(undefined);

  const [buttonDisabled, setButtonDisabled] = useState(false)

  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditing(false);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedUser = { ...user };

    console.log("updatedUser ===> ", updatedUser)

    const updatedChild = updatedUser.children.find((child) => child._id === childId);

    const eventIndex = updatedChild.events.findIndex((event) => event._id === eventId);

    // const updatedChild = { ...user.children[childIndex] }

    console.log("updatedChild ===> ", updatedChild)

    // const eventIndex = updatedChild.events.find((event) => event.id === eventId)

    updatedChild.events[eventIndex] = {
      ...updatedChild.events[eventIndex],
      ...editedEvent,
    };

    const updatedUserIndex = updatedUser.children.findIndex((child) => child._id === childId);

    updatedUser.children[updatedUserIndex] = updatedChild;

    post(`/events/edit/${childId}/${eventId}`, editedEvent)
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
            console.log(response.data.image);
            console.log()
            setEditedEvent((prev) => ({...prev, [e.target.name]: response.data.image}));
            setButtonDisabled(false);
          })
          .catch((err) => {
            setButtonDisabled(false);
            console.log("Error while uploading the file: ", err);
          });
  }

  useEffect(() => {
    const childToEdit = user.children.find((child) => child._id === childId);

    if (childToEdit) {

      const eventToEdit = childToEdit.events.find((event) => event._id === eventId)

      if (eventToEdit) {
        setEditedEvent({
          eventTitle: eventToEdit.eventTitle,
          date: eventToEdit.date,
          description: eventToEdit.description,
          img: eventToEdit.img
        })
      }
    }
  }, [user, childId, eventId])

  return (

    <div className="container mt-5 EditProfilePage">
  <h1 className="text-center">Edit Event</h1>

  {editedEvent && (
    <form onSubmit={handleEditSubmit} className="my-4">
      <div className="mb-3">
        <label className="form-label">Event Title:</label>
        <input
          type="text"
          name="eventTitle"
          value={editedEvent.eventTitle}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Date:</label>
        <input
          type="text"
          name="date"
          value={editedEvent.date}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description:</label>
        <input
          type="text"
          name="description"
          value={editedEvent.description}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Image:</label>
        <input
          type="file"
          name="img"
          onChange={handlePhotoChange}
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary" onClick={handleEditSubmit} disabled={buttonDisabled}>
        Save Changes
      </button>
    </form>
  )}

  {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}

  <button className="btn btn-secondary mt-3" onClick={handleEditClick}>
    Cancel
  </button>
</div>


  )
}

export default EditEvent