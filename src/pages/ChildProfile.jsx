import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import differenceInYears from 'date-fns/differenceInYears';

const ChildProfile = () => {
    const { childId } = useParams();
    const {user} = useContext(AuthContext)
    console.log(user)
    const child = user && user.children.find((item) => item._id === childId)
    const date = child && new Date(child.dateOfBirth.replace(/-/g, '\/').replace(/T.+/, ''))

  return child ? (
    <div className="child-profile">
      <p>Date of Birth: {child.dateOfBirth.slice(0, 10)}</p>
      <p>Age: {Math.abs(differenceInYears(date, Date.now()))} </p>
      <img src={child.img} alt="Child's profile" />
    </div>
  ) : <p>loading..</p>
};

export default ChildProfile;