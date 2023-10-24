
import { useNavigate } from 'react-router-dom';
import { axiosDelete } from '../services/authService';

function ChildProfileDelete({ childId }) { 

  const navigate = useNavigate()


  const deleteChildProfile = async () => {
    const confirmDelete = window.confirm('Do you really want to delete this child profile?');
    if (confirmDelete) {
      axiosDelete(`/children/${childId}`)
      .then(data => {
        alert('Child information deleted.');
        navigate('/profile');
      })
      .catch((error) => {
        alert(error.message || 'An error occurred while deleting the child profile.');
      });
    }
  };

  return (
    <div>
      <h3>Child Profile</h3>
      <button onClick={deleteChildProfile}>Delete Profile</button>
    </div>
  );
}

export default ChildProfileDelete;
