import React, { FunctionComponent } from 'react';
import Header from './_components/header';
import Footer from './_components/footer';

interface LayoutMainProps {
  children: React.ReactNode;
}

const LayoutMain: FunctionComponent<LayoutMainProps> = ({ children }) => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default LayoutMain;
