import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import differenceInYears from 'date-fns/differenceInYears';
import EditChild from '../components/EditChild';

const ChildProfile = () => {
    const { childId } = useParams();
    const {user} = useContext(AuthContext)
    const [isEditing, setIsEditing] = useState(false)

    const handleEditClick = () => {
      setIsEditing(true);
    }

    console.log(user)
    const child = user && user.children.find((item) => item._id === childId)
    const date = child && new Date(child.dateOfBirth.replace(/-/g, '\/').replace(/T.+/, ''))

    if (isEditing) {
      return <EditChild user={child} setIsEditing={setIsEditing} />;
    } else {
      return child ? (
        <div className="child-profile">
          <h1>{child.name}</h1>
          <p>Date of Birth: {child.dateOfBirth.slice(0, 10)}</p>
          <p>Age: {Math.abs(differenceInYears(date, Date.now()))} </p>
          <img src={child.img} alt="Child's profile" />
          <button onClick={handleEditClick}>Edit Profile</button>
        </div>
      ) : (
        <p>loading..</p>
      );
    }
};

export default ChildProfile;