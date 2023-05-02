import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const isAuth = false;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  });

  return <div>MainPage</div>;
}
