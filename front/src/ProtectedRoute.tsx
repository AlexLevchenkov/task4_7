import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth, onIdTokenChanged } from 'firebase/auth';

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(() => getAuth().currentUser);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(getAuth(), (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
