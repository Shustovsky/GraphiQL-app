import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, logout } from './../firebase';

export default function MainPage() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    console.log(db);
    if (loading) return;
    if (!user) navigate('/login');
  }, [user, loading, navigate]);

  return (
    <div className="flex justify-between">
      <div>MainPage</div>
      <span
        data-tooltip="эта подсказка длиннее, чем элемент"
        className="cursor-pointer"
        onClick={logout}
      >
        {user?.email}
      </span>
    </div>
  );
}
