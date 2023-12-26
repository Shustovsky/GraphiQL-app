import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormAuth from '../FormAuth';
import { auth, registerWithEmailAndPassword } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';

function SignUp() {
  const isSignIn = false;
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/');
  }, [user, loading, navigate]);

  const registration = (name: string, email: string, pass: string): Promise<void> => {
    return registerWithEmailAndPassword(name, email, pass);
  };

  return (
    <div>
      <FormAuth
        title={t('register')}
        titleBtn={t('sign-up_button')}
        isSignIn={isSignIn}
        handlclick={registration}
      />
    </div>
  );
}

export default SignUp;
