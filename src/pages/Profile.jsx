import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import EditProfile from "../components/EditProfile";
import AddChild from "../components/AddChild";
import DeleteProfile from "../components/DeleteProfile";


const Profile = () => {

  const { user } = useContext(AuthContext);

  // console.log("User ===>", user)

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
      <div className="container mt-5 EditProfilePage">
        <h1 className="text-center">Home</h1>
        {user && (
          <>
            <h2 className="mt-3">Welcome {user.userName}!</h2>
            <img className="img-fluid rounded-circle profile-picture" src={user.img} alt="User Image" />
            <div className="row">
              <p className="mt-3">
                { user.children.map((child) => (
                    <Link className="col-3 thumbnail-link" to={`/child-profile/${child._id}`}>
                      <img src={child.img} alt={child.name} className="img-fluid img-thumbnail thumbnail-img rounded-circle border border-info border border-2"/>
                    </Link>
                ))}
              </p>
            </div>
          </>
          )}
          <button className="btn btn-primary me-2" onClick={handleAddChildClick}>Add Child</button>
          <button className="btn btn-secondary me-2" onClick={handleEditClick}>Edit Profile</button>
          <button className="btn btn-warning me-2" onClick={handleWillDelete}>Delete Profile</button>
          <Link className="btn btn-danger" to="/">Logout</Link>
        </div>
      </>
    );


  }
}

export default Profile