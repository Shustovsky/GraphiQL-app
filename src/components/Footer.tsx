import rsLogo from '../assets/icons/rs_school_js.svg';
import github from '../assets/icons/github-mark.png';
import { LinkWithImg } from './LinkWithImg';

export function Footer() {
  return (
    <footer className="flex justify-around items-center  bg-gray-100 py-1 ">
      ©2023
      <LinkWithImg title="A. Shustovsky" href="https://github.com/shustovsky/" src={github} />
      <LinkWithImg title="P. Sobchenko" href="https://github.com/pavel-sobchenko" src={github} />
      <LinkWithImg title="A. Dzivin" href="https://github.com/D1van007" src={github} />
      <LinkWithImg title="" href="https://rs.school/react/" src={rsLogo} />
    </footer>
  );
}
