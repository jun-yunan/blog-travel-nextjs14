import { FunctionComponent } from 'react';

interface LayoutAuthProps {
  children: React.ReactNode;
}

const LayoutAuth: FunctionComponent<LayoutAuthProps> = ({ children }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {children}
    </div>
  );
};

export default LayoutAuth;
