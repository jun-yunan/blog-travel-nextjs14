import React, { FunctionComponent } from 'react';
import Header from './_components/header';

interface LayoutMainProps {
  children: React.ReactNode;
}

const LayoutMain: FunctionComponent<LayoutMainProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-full items-center">
      <Header />
      {children}
    </div>
  );
};

export default LayoutMain;
