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
      <main className="w-full mt-[60px]">{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutMain;
