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
    <Card className="flex lg:flex-row flex-col w-full shadow">
      <Image
        src={imageSrc}
        className="object-cover w-[260px] h-[160px] cursor-pointer flex-shrink-0 hover:scale-105 hover:opacity-75 transition-all duration-300 rounded-md"
        width={260}
        height={160}
        alt=""
      />
      <div className="flex flex-col items-start justify-between bg-slate-100 gap-y-4 p-3">
        <p className=" text-base font-semibold leading-tight hover:underline">
          {title}
        </p>
        <p className="text-sm text-blue-500 font-light hover:underline">
          Read more
        </p>
      </div>
    </Card>
  );
};

export default CardBlog;
