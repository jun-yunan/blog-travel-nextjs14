import { FunctionComponent } from 'react';

interface LayoutUserProps {
  children: React.ReactNode;
}

const LayoutUser: FunctionComponent<LayoutUserProps> = ({ children }) => {
  return <div className="w-full flex flex-col items-center">{children}</div>;
};

export default LayoutUser;
