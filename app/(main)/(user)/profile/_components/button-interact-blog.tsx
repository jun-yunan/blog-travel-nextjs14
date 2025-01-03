import { Button } from '@/components/ui/button';
import { ThumbsUp } from 'lucide-react';
import { FunctionComponent } from 'react';

interface ButtonInteractBlogProps {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
}

const ButtonInteractBlog: FunctionComponent<ButtonInteractBlogProps> = ({
  children,
  label,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      size="default"
      variant="ghost"
      className="text-base font-medium rounded-full flex items-center justify-center lg:px-6 lg:gap-x-2"
    >
      {children}
      <p>{label}</p>
    </Button>
  );
};

export default ButtonInteractBlog;
