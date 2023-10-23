import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import EditProfile from "../components/EditProfile";
import DeleteProfile from "../components/DeleteProfile";


const Profile = () => {

  const { user } = useContext(AuthContext)
  console.log("User ===>", user)

  const [isEditing, setIsEditing] = useState(false)

  const [willDelete, setWillDelete] = useState(false)

  const handleEditClick = () => {
    setIsEditing(true);
  }

  const handleWillDelete = () => {
    setWillDelete(true);
  }

  if (isEditing) {
    return <EditProfile user={user} setIsEditing={setIsEditing} />;
  } else if (willDelete) {
    return <DeleteProfile user={user} setWillDelete={setWillDelete} />;
  } else {
    return (
      <>
        <h1>Profile</h1>
        {user && (
          <>
            <h2>Welcome {user.userName}!</h2>
            <img className="user-image" src={user.img} />
            <p>{user.children}</p>
          </>
        )}
        <Link to="/add-child">Add Child</Link>
        <Link onClick={handleEditClick}>Edit Profile</Link>
        <Link onClick={handleWillDelete}>Delete Profile</Link>
        <Link to="/signup">Logout</Link>
      </>
    );
  }
}

export default Profile