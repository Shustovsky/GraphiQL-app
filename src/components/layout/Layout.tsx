import { Header } from '../Header';
import { Footer } from '../Footer';
import ChildrenProps from '../../models/children-props';

function Layout({ children }: ChildrenProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
