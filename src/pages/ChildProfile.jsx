import { useContext, useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import differenceInYears from 'date-fns/differenceInYears';
import { axiosDelete } from '../services/authService';
import ChildProfileDelete from '../components/ChildProfileDelete';

const ChildProfile = () => {
  const navigate = useNavigate();
    const { childId } = useParams();
    const {user, setUser, storeToken} = useContext(AuthContext)
    console.log(user)
    const child = user && user.children.find((item) => item._id === childId)
    const date = child && new Date(child.dateOfBirth.replace(/-/g, '\/').replace(/T.+/, ''))


    const deleteChildProfile = async () => {
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

  return child ? (
    <div className="child-profile">
      <p>Date of Birth: {child.dateOfBirth.slice(0, 10)}</p>
      <p>Age: {Math.abs(differenceInYears(date, Date.now()))} </p>
      <img src={child.img} alt="Child's profile" />
      <button onClick={deleteChildProfile}>Delete Profile</button>
    </div>
  ) : <p>loading..</p>
};

export default ChildProfile;