import React from 'react';
import { Link } from 'react-router-dom';
import SignUp from '../components/formAuth/signUp/SignUp';
import { useTranslation } from 'react-i18next';

export default function RegisterPage() {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="text-blue-600 text-2xl">{t('register_page')}</h2>
      <SignUp />
      <p className="text-center">
        {t('have_account')}
        <Link className="text-red-700" to="/login">
          {t('sign-in_button')} →
        </Link>
      </p>
    </>
  );
}
