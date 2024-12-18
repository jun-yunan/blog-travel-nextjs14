import { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface CardBlogProps {
  imageSrc: string;
  title: string;
  href?: string;
}

const CardBlog: FunctionComponent<CardBlogProps> = ({
  imageSrc,
  title,
  href,
}) => {
  return (
    <Card className="flex w-full gap-x-7 shadow">
      <Image
        src={imageSrc}
        className="object-cover w-[260px] h-[160px] cursor-pointer flex-shrink-0 hover:scale-105 hover:opacity-75 transition-all duration-300 rounded-md"
        width={260}
        height={160}
        alt=""
      />
      <div className="flex flex-col h-full items-start justify-around">
        <Link
          href={href || ''}
          className=" text-base font-semibold leading-tight hover:underline"
        >
          {title}
        </Link>
        <Link href={href || ''} className="text-sm font-light leading-tight">
          Read more
        </Link>
      </div>
    </Card>
  );
};

export default CardBlog;
