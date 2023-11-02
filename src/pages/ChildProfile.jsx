import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import differenceInYears from 'date-fns/differenceInYears';
import { axiosDelete, get } from '../services/authService';
``
import EditChild from '../components/EditChild';
import AddEvent from '../components/AddEvent';


const ChildProfile = () => {
  const { childId } = useParams();
  const { user, setUser, storeToken } = useContext(AuthContext); // added setUser, storeToken
  const [isEditing, setIsEditing] = useState(false);

  const [addEvent, setAddEvent] = useState(false);

  const [events, setEvents] = useState(null);

  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleAddEventClick = () => {
    setAddEvent(true);
  };

  console.log("User ===>", user);
  // console.log("DOB ===>", user.children[0].dateOfBirth);
  const DOB = user.children[0].dateOfBirth;
  const formatDOBRegex = /(\d{4})-(\d{2})-(\d{2})/;

  const formattedDOB = formatDOBRegex.exec(DOB);
  // console.log("Formatted DOB ===>", formattedDOB);

  let formattedDate;

  if (formattedDOB) {
    const year = formattedDOB[1];
    const month = formattedDOB[2];
    const day = formattedDOB[3];
    formattedDate = `${month}/${day}/${year}`;
    console.log(formattedDate); // Output: "10/02/2011"
  } else {
    console.log('Date not found in the input string.');
  }

  const child = user && user.children.find((item) => item._id === childId);
  const date = child && new Date(child.dateOfBirth.replace(/-/g, "/").replace(/T.+/, ""));

  const deleteChildProfile = async () => {
    // Added method
    const confirmDelete = window.confirm(
      "Do you really want to delete this child profile?"
    );
    if (confirmDelete) {
      axiosDelete(`/child/delete/${childId}`)
        .then((response) => {
          setUser(response.data.user);
          storeToken(response.data.authToken);
          alert("Child information deleted.");
          navigate("/profile");
        })
        .catch((error) => {
          alert(
            error.message ||
              "An error occurred while deleting the child profile."
          );
        });
    }
  };

  useEffect(() => {
    get(`/events/all/${childId}`)
      .then((res) => {
        console.log(res);
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [childId, user]);

  if (isEditing) {
    return <EditChild user={child} setIsEditing={setIsEditing} />;
  } else if (addEvent) {
    return <AddEvent user={child} setAddEvent={setAddEvent} />;
  } else {
    return child ? (
      <div className="container mt-5 LoginPage">
        <h1 className="text-center display-4">{child.name}</h1>
        <div className="card mt-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p className="card-text">
                  <strong>Date of Birth:</strong>{" "}
                    {formattedDate}
                  {/* {child.dateOfBirth.slice(0, 10)} */}
                </p>
                <p className="card-text">
                  <strong>Age:</strong>{" "}
                  {Math.abs(differenceInYears(date, Date.now()))}
                </p>
              </div>
              <div className="col-md-6">
                <img
                  className="img-fluid rounded mb-3"
                  src={child.img}
                  alt="Child's profile"
                />
              </div>
            </div>
            <div className="btn-group">
              {child.events.map((event) => (
                <Link
                  className="btn btn-outline-info me-2"
                  to={`/event/${childId}/${event._id}`}
                  key={event.Id}
                >
                  {event.eventTitle}
                </Link>
              ))}
            </div>
          </div>
        </div>

          <button className="btn btn-secondary me-2" onClick={handleEditClick}>
            Edit Profile
          </button>
          <button className="btn btn-danger me-2" onClick={deleteChildProfile}>
            Delete Profile
          </button>
          <button className="btn btn-primary me-2" onClick={handleAddEventClick}>
            Add Event
          </button>
          <Link className="btn btn-secondary me-2" to={`/profile`}>
            Back to Profile
          </Link>

      </div>
    ) : (
      <p>loading..</p>
    );
  }
};

export default ChildProfile;