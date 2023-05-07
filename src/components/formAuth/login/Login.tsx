import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import FormAuth from '../FormAuth';
import { auth, logInWithEmailAndPassword } from './../../../firebase';

function Login() {
  const isSignIn = true;
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user);

    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate('/');
  }, [user, loading, navigate]);

  const loginAccount = (name: string, email: string, pass: string): Promise<void> => {
    return logInWithEmailAndPassword(email, pass);
  };
  return (
    <div>
      <FormAuth
        title="Sign in to your account"
        titleBtn="Sign in"
        isSignIn={isSignIn}
        handlclick={loginAccount}
      />
    </div>
  );
}

export default Login;
