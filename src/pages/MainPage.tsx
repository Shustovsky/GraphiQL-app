import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const isLogined = false;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogined) {
      navigate('/login');
    }
  });

  return <div>MainPage</div>;
}
