import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import EditProfile from "../components/EditProfile";
import AddChild from "../components/AddChild";
import DeleteProfile from '../components/DeleteProfile'


const Profile = () => {

  const { user } = useContext(AuthContext);

  console.log("User ===>", user)

  const [isEditing, setIsEditing] = useState(false)

  const [willDelete, setWillDelete] = useState(false)

  const [addChild, setAddChild] = useState(false)

  const handleEditClick = () => {
    setIsEditing(true);
  }

  const handleWillDelete = () => {
    setWillDelete(true);
  }

  const handleAddChildClick = () => {
    setAddChild(true);
  }

  if (isEditing) {
    return <EditProfile user={user} setIsEditing={setIsEditing} />;
  } else if (willDelete) {
    return <DeleteProfile user={user} setWillDelete={setWillDelete} />;
  } else if (addChild) {
    return <AddChild user={user} setAddChild={setAddChild} />
  } else {
    return (
      <>
        <h1>Profile</h1>
        {user && (
          <>
            <h2>Welcome {user.userName}!</h2>
            <img className="user-image" src={user.img} alt="User Image" />
            <p>
              { user.children.map((child) => (

                  <Link to={`/child-profile/${child._id}`}>{child.name}</Link>

              ))}
            </p>
          </>
        )}
        <button onClick={handleAddChildClick}>Add Child</button>
        <button onClick={handleEditClick}>Edit Profile</button>
        <button onClick={handleWillDelete}>Delete Profile</button>
        <Link to="/signup">Logout</Link>
      </>
    );

  }
}

export default Profile