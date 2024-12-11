import { Button } from '@/components/ui/button';
import { ThumbsUp } from 'lucide-react';
import { FunctionComponent } from 'react';

interface ButtonActionBlogProps {}

const ButtonActionBlog: FunctionComponent<ButtonActionBlogProps> = () => {
  return (
    <Button>
      <ThumbsUp />
      <p>Like</p>
    </Button>
  );
};

export default ButtonActionBlog;
