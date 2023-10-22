import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


const Profile = () => {

  const { user } = useContext(AuthContext)
  console.log("User ===>", user)

  return (
    <div>

      <h1>Profile</h1>

      { user && <h2>Welcome {user.userName}!</h2> }

      <img className="user-image" src={user.img} />
      <p>{user.children}</p>

      <Link to='/add-child'>Add Child</Link>

    </div>
  )
}

export default Profile