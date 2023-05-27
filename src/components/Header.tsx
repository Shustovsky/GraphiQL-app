import logo from '../assets/icons/logo.png';
import { useEffect, useState } from 'react';
import { Button } from './Button';
import UserName from './UserName';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { LangSwitcher } from './langSwitcher/LangSwitcher';
import { useTranslation } from 'react-i18next';
import MobileNav from './MobileNav';

export function Header(): JSX.Element {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
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
      className={`py-1 px-10 z-30 flex justify-between sticky top-0 transition-all duration-700 ${
        isSticky ? 'h-12 bg-[#0b1924]' : 'h-14 bg-black'
      }`}
    >
      <img className="w-10 h-10" src={logo} alt="logo" />

      <div className="hidden md:flex">
        {!user && (
          <div className="flex gap-1">
            <Button
              label={t('sign-up_button')}
              onClick={() => {
                navigate('/register');
                console.log(isOpenMenu);
              }}
            />
            <Button
              label={t('login_button')}
              onClick={() => {
                navigate('/login');
              }}
            />
          </div>
        )}
        <UserName />
        <LangSwitcher />
      </div>
      <MobileNav isOpenMenu={(isOpen: boolean) => setIsOpenMenu(isOpen)} />
    </header>
  );
}
