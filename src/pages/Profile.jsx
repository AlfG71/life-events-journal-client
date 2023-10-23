import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import EditProfile from "../components/EditProfile";


const Profile = () => {

  const { user } = useContext(AuthContext)
  console.log("User ===>", user)

  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing(true);
  }

  const experimenting = () => {
    console.log("Clicking Link Tag")
  }

  return (
    <div>

      { isEditing ? (
        <EditProfile user={user} setIsEditing={setIsEditing} />
        ) : (
        <>
          <h1>Profile</h1>

          {user &&


          <>

            <h2>Welcome {user.userName}!</h2>
            <img className="user-image" src={user.img} />
            <p>{user.children}</p>

          </>


          }


          <Link to='/add-child'>Add Child</Link>
<Link onClick={handleEditClick} >Experiment</Link>
          <button onClick={handleEditClick}>Edit Profile</button>
          {/* <Link to='/update' onClick={handleEditClick}>Edit Profile</Link> */}
          <Link to='/delete'>Delete Profile</Link>
          <Link to='/login'>Logout</Link>  {/* explore more, not sure how to work it */}
        </>
      )}
    </div>
  )
}

export default Profile