import { Link } from 'react-router-dom';
import Login from './../components/formAuth/login/Login';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="text-blue-600 text-2xl ">{t('login_page')}</h2>
      <Login />
      <p className="text-center">
        {t('new_graphql')}
        <Link className="text-blue-500" to="/register">
          {t('create_account')}
        </Link>
      </p>
    </>
  );
}
