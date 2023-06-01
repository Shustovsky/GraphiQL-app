import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import MobileNav from '../components/MobileNav';
import { setMobileMenu } from '../store/slices/mobileMenuSlice';

export default function HomePage() {
  const dispatch = useDispatch();
  const isOpen: boolean = useSelector((state) => (state as RootState).mobileMenu.isMenuOpen);
  return (
    <>
      {isOpen && (
        <div
          className="darkBG h-full w-full absolute backdrop-blur-sm z-[150]"
          onClick={() => {
            dispatch(setMobileMenu(!isOpen));
          }}
        ></div>
      )}
      <Header />
      <Outlet />
      <Footer />
      <MobileNav />
    </>
  );
}
