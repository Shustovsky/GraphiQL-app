import { Link } from 'react-router-dom';
import Login from './../components/formAuth/login/Login';

export default function LoginPage() {
  return (
    <>
      <h2 className="text-blue-600 text-2xl ">LoginPage</h2>
      <Login />
      <p className="text-center">
        New to GraphQL?{' '}
        <Link className="text-blue-500" to="/register">
          Create an account.
        </Link>
      </p>
    </>
  );
}
