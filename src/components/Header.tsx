import logo from '../assets/icons/logo.png';
import { useEffect, useState } from 'react';
import { Button } from './Button';
import UserName from './UserName';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../firebase';
import { LangSwitcher } from './langSwitcher/LangSwitcher';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setMobileMenu } from '../store/slices/mobileMenuSlice';
import { signOut } from 'firebase/auth';

export function Header(): JSX.Element {
  const [isSticky, setIsSticky] = useState(false);
  const dispatch = useDispatch();
  const isOpen: boolean = useSelector((state) => (state as RootState).mobileMenu.isMenuOpen);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`py-1 px-3 sm:px-10 z-[999] flex justify-between sticky top-0 transition-all duration-700 ${
        isSticky ? 'h-12 bg-[#0b1924]' : 'h-14 bg-black'
      }`}
    >
      <img className="w-10 h-10" src={logo} alt="logo" />

      <div
        className={`grid gap-2 grid-cols-1 justify-center md:flex-row md:justify-end md:bg-opacity-0 md:flex absolute md:right-10 right-0 top-0 md:top-12 z-[1221] md:h-auto h-[50vh] w-full bg-[#e8f0fe] transition-all duration-400 ${
          isOpen ? '' : '-translate-y-full'
        }`}
      >
        <LangSwitcher startRow={2} />
        {!user && (
          <div className="flex gap-1 row-start-3 justify-center">
            <Button
              label={t('sign-up_button')}
              onClick={() => {
                navigate('/register');
                dispatch(setMobileMenu(!isOpen));
              }}
            />
            <Button
              label={t('login_button')}
              onClick={() => {
                navigate('/login');
                dispatch(setMobileMenu(!isOpen));
              }}
            />
          </div>
        )}
        {user ? (
          <UserName startRow={1} />
        ) : (
          <span className="md:hidden block text-center my-auto">Сардэчна запрашаем</span>
        )}
        {user && (
          <Button
            startRow={3}
            label={t('logout_button')}
            onClick={() => {
              signOut(auth);
              dispatch(setMobileMenu(!isOpen));
            }}
          />
        )}
      </div>
    </header>
  );
}
