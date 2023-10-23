import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";
import { axiosDelete } from '../services/authService';
import { useContext } from 'react';

const DeleteProfile = ({ user, setWillDelete }) => {
  const navigate = useNavigate();
  const { authenticateUser, storeToken } = useContext(AuthContext)

  const handleDelete = () => {
    const confirmDelete = window.confirm('Do you really want to cancel your profile?');
    if (confirmDelete) {
        axiosDelete('/users/delete')
        
      .then(data => {
        alert('User information deleted.');
        navigate('/signup');
      })
      .catch(error => {
        alert(error.message || 'An error occurred while deleting your profile.');
      });
    } 
    else{navigate('/')}
  };

  return (
    <div>
      <h2>Are you sure you want to delete your profile?</h2>
      <button onClick={handleDelete} className="btn btn-danger">Yes, Delete</button>
      <button onClick={() => setWillDelete(false)} className="btn btn-secondary">Cancel</button>
    </div>
  );
};

export default DeleteProfile;
