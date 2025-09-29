import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface CatalogLayoutProps {
  children: ReactNode;
}

const CatalogLayout = ({ children }: CatalogLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default CatalogLayout;
