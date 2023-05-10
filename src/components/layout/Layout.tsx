import { Header } from '../Header';
import { Footer } from '../Footer';

interface IProps {
  children: string | JSX.Element | JSX.Element[];
}

function Layout({ children }: IProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
