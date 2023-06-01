import rsLogo from '../assets/icons/rs_school_js.svg';
import github from '../assets/icons/github-mark.png';
import { LinkWithImg } from './LinkWithImg';

export function Footer() {
  return (
    <footer className="text-[#002B36] h-14 relative z-50 bottom-0 flex flex-wrap gap-1 justify-around items-center  bg-gray-100 py-1">
      <span className="sm:block hidden"> ©2023</span>
      <LinkWithImg title="A. Shustovsky" href="https://github.com/shustovsky/" src={github} />
      <LinkWithImg title="P. Sobchenko" href="https://github.com/pavel-sobchenko" src={github} />
      <LinkWithImg title="A. Dzivin" href="https://github.com/D1van007" src={github} />

      <LinkWithImg title="" href="https://rs.school/react/" src={rsLogo} />
    </footer>
  );
}
