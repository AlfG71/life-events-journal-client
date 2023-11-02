import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

import EditEvent from '../components/EditEvent';

import { axiosDelete } from '../services/authService';


const Event = () => {
  const { childId, eventId } = useParams()

  const navigate = useNavigate();

  const { user, setUser, storeToken } = useContext(AuthContext)

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  }

  const child = user && user.children.find((item) => item._id === childId)
  const event = child && child.events.find((event) => event._id === eventId)
  const date = event && String(new Date(event.date.replace(/-/g, '\/').replace(/T.+/, '')))

  // const regexPattern = /[A-Z][a-z]{2} \d{2} \d{4}/;

  // const formattedDate = date.match(regexPattern)[0]

  console.log('Event Is ===>', event)
  // console.log("Date type is ===> ", (typeof date))

  const deleteEvent = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?')

    if (confirmDelete) {
      axiosDelete(`/events/delete/${childId}/${eventId}`)
      .then(res => {
        console.log("Data ===> ", res.data)
        setUser(res.data.user)
        storeToken(res.data.authToken)
        alert('Event deleted...');
        navigate(`/child-profile/${childId}`)
      })
      .catch((err) => {
        alert(err.message || 'An error ocurred while trying to delete this event.')
      })
    }
  }

  if (isEditing) {
    return <EditEvent user={event} setIsEditing={setIsEditing} />;
  } else {
      return ( event &&
        <div className="container mt-5 event-profile EditProfilePage ">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">{event.eventTitle}</h1>
            <p className="card-text">{event.description}</p>
            <p className="card-text">{event.date.slice(0, 10)}</p>
            <img src={event.img} alt="Event image" className="img-fluid rounded mb-3 event-picture"/>
          </div>
          <div className="card-footer text-center">
            <button className="btn btn-primary me-2" onClick={handleEditClick}>Edit Event</button>
            <Link className="btn btn-secondary me-2" to={`/child-profile/${childId}`} onClick={handleEditClick}>
              Back to Profile
            </Link>
            <button className="btn btn-danger" onClick={deleteEvent}>Delete Event</button>
          </div>
        </div>
      </div>

            )
  }
}

export default Event