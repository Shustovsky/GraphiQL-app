import logo from '../assets/icons/logo.png';
import { useEffect, useState } from 'react';
import { Button } from './Button';
import UserName from './UserName';

export function Header(): JSX.Element {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`py-1 px-10 flex justify-between sticky top-0 transition-all duration-700 ${
        isSticky ? 'h-12 ' : 'h-14 bg-black'
      }`}
    >
      <img className="w-10 h-10" src={logo} alt="logo" />

      <Button
        label="Sign up"
        onClick={() => {
          /*TODO заглушка на кнопку*/
        }}
      />
      <UserName />
    </header>
  );
}
