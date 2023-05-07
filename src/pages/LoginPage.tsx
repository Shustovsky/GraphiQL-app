import { Link } from 'react-router-dom';
import Login from './../components/formAuth/login/Login';

export default function LoginPage() {
  return (
    <>
      <h2 className="text-blue-600 text-2xl ">LoginPage</h2>
      <Login />
      <p className="text-center">
        Sign in or{' '}
        <Link className="text-red-700" to="/register">
          register
        </Link>
      </p>
    </>
  );
}
