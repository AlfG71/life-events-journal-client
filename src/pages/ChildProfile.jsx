import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import differenceInYears from 'date-fns/differenceInYears';
import { axiosDelete } from '../services/authService'; // added

import EditChild from '../components/EditChild';
import AddEvent from '../components/AddEvent';

const ChildProfile = () => {
    const { childId } = useParams();
    const { user, setUser, storeToken } = useContext(AuthContext); // added setUser, storeToken
    const [isEditing, setIsEditing] = useState(false);

    const [addEvent, setAddEvent] = useState(false);

    const navigate = useNavigate();

    const handleEditClick = () => {
      setIsEditing(true);
    }

    const handleAddEventClick = () => {
      setAddEvent(true);
    }

    console.log("User ===>", user)
    const child = user && user.children.find((item) => item._id === childId)
    const date = child && new Date(child.dateOfBirth.replace(/-/g, '\/').replace(/T.+/, ''))

    const deleteChildProfile = async () => {  // Added method
      const confirmDelete = window.confirm('Do you really want to delete this child profile?');
      if (confirmDelete) {
        axiosDelete(`/child/delete/${childId}`)
        .then(response => {
          setUser(response.data.user)
          storeToken(response.data.authToken)
          alert('Child information deleted.');
          navigate('/profile');
        })
        .catch((error) => {
          alert(error.message || 'An error occurred while deleting the child profile.');
        });
      }
    };

    if (isEditing) {
      return <EditChild user={child} setIsEditing={setIsEditing} />;
    } else if (addEvent) {
      return <AddEvent user={child} setAddEvent={setAddEvent} />;
    } else {
      return child ? (
        <div className="child-profile">
          <h1>{child.name}</h1>
          <p>Date of Birth: {child.dateOfBirth.slice(0, 10)}</p>
          <p>Age: {Math.abs(differenceInYears(date, Date.now()))} </p>
          <img src={child.img} alt="Child's profile" />
          <p>
            { child.events.map((event) => (

                <Link to={`/all/${childId}`}>{event.eventTitle}</Link>

            ))}
          </p>
          <button onClick={handleEditClick}>Edit Profile</button>
          <button onClick={deleteChildProfile}>Delete Profile</button>
          <button onClick={handleAddEventClick}>Add Event</button>
        </div>
      ) : (
        <p>loading..</p>
      );
    }
};

export default ChildProfile;