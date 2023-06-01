import { useDispatch, useSelector } from 'react-redux';
import { setMobileMenu } from '../store/slices/mobileMenuSlice';
import { RootState } from '../store';

function MobileNav() {
  const dispatch = useDispatch();
  const isOpen: boolean = useSelector((state) => (state as RootState).mobileMenu.isMenuOpen);

  return (
    <>
      <div
        className="fixed z-[1000] right-3 sm:right-10 flex flex-col gap-2 top-4 cursor-pointer md:hidden"
        onClick={() => {
          dispatch(setMobileMenu(!isOpen));
          console.log(isOpen);
        }}
      >
        <div
          className={`relative w-8 h-0.5 bg-slate-300 rounded-sm transition-all ${
            isOpen ? 'rotate-45 translate-y-2.5' : ''
          }`}
        ></div>
        <div
          className={`relative w-8 h-0.5 bg-slate-300 rounded-sm transition-all ${
            isOpen ? 'opacity-0' : ''
          }`}
        ></div>
        <div
          className={`relative w-8 h-0.5 bg-slate-300 rounded-sm transition-all ${
            isOpen ? '-rotate-45 -translate-y-2.5' : ''
          }`}
        ></div>
      </div>
    </>
  );
}

export default MobileNav;
