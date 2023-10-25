import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

import EditEvent from '../components/EditEvent';


const Event = () => {
  const { childId, eventId } = useParams()

  const { user } = useContext(AuthContext)

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
  console.log("Date type is ===> ", (typeof date))

  if (isEditing) {
    return <EditEvent user={event} setIsEditing={setIsEditing} />;
  } else {
      return ( event &&
              <div className="event-profile">
                <h1>{event.eventTitle}</h1>
                <p>{event.description}</p>
                <p>{event.date.slice(0, 10)}</p>
                <img src={event.img} alt="Event image" />
                <button onClick={handleEditClick}>Edit Event</button>
                <Link to={`/child-profile/${childId}`} onClick={handleEditClick}>
                  Back to Profile
                </Link>
              </div>
            )
  }
}

export default Event