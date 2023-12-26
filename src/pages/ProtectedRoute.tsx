import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader } from '../components/loader/Loader';
import { auth } from '../firebase';
import ChildrenProps from '../models/children-props';

const ProtectedRoute = ({ children }: ChildrenProps) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return (
      <div className="absolute inset-y-1/2 inset-x-2/4">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/welcome" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
