import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams } from "react-router-dom";
import { post } from "../services/authService";

const AddEvent = ({ setAddEvent }) => {
    const { childId } = useParams();

    const { user, setUser, storeToken } = useContext(AuthContext)

    const [eventData, setEventData] = useState({
      eventTitle: '',
      date: '',
      description: '',
      img: ''
    })

    const [errorMessage, setErrorMessage] = useState(undefined);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEventData({ ...eventData, [name]: value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      post(`/events/create/${childId}`, eventData)
        .then((res) => {
          console.log(res);
          console.log('Data ===>', res.data);
          // console.log('JWT token ===>', res.data.authToken)
          setAddEvent(false);
          storeToken(res.data.authToken);
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
          next(err);
        })
    };



  return (
    <div className="container mt-5 EditProfilePage">
  <h1 className="text-center">Add Event</h1>
  <form onSubmit={handleSubmit} className="my-4">
    <div className="mb-3">
      <label className="form-label">Event Name:</label>
      <input
        type="text"
        name="eventTitle"
        value={eventData.eventTitle}
        onChange={handleInputChange}
        className="form-control"
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Date:</label>
      <input
        type="date"
        name="date"
        value={eventData.date}
        onChange={handleInputChange}
        className="form-control"
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Description:</label>
      <input
        type="text"
        name="description"
        value={eventData.description}
        onChange={handleInputChange}
        className="form-control"
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Image URL:</label>
      <input
        type="text"
        name="image"
        value={eventData.img}
        onChange={handleInputChange}
        className="form-control"
      />
    </div>

    <button type="submit" className="btn btn-primary">Add Event</button>
  </form>
</div>

  );
}

export default AddEvent