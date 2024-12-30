import { Loader2 } from 'lucide-react';
import { FunctionComponent } from 'react';

interface LoadingProfilePageProps {}

const LoadingProfilePage: FunctionComponent<LoadingProfilePageProps> = () => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default LoadingProfilePage;
