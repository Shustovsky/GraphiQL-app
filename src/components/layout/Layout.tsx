import { Header } from '../Header';

interface IProps {
  children: string | JSX.Element | JSX.Element[];
}

function Layout({ children }: IProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export default Layout;
