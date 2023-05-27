import { useEffect, useState } from 'react';

interface IProps {
  isOpenMenu: (element: boolean) => void;
  // clearText: (element: boolean) => void;
  // submitText: (element: boolean) => void;
}

function MobileNav({ isOpenMenu }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    isOpenMenu(isOpen);
  }, [isOpen, isOpenMenu]);

  return (
    <div
      className="absolute right-10 flex flex-col gap-2 top-4 cursor-pointer md:hidden"
      onClick={() => {
        setIsOpen(!isOpen);
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
          isOpen ? 'translate-x-20' : ''
        }`}
      ></div>
      <div
        className={`relative w-8 h-0.5 bg-slate-300 rounded-sm transition-all ${
          isOpen ? '-rotate-45 -translate-y-2.5' : ''
        }`}
      ></div>
    </div>
  );
}

export default MobileNav;
