/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface CardExploreProps {
  imageSrc: string;
  title: string;
  href?: string;
}

const CardExplore: FunctionComponent<CardExploreProps> = ({
  imageSrc,
  title,
  href,
}) => {
  return (
    <Card className="relative w-full h-[730px] flex-1">
      <Image
        width={1920}
        height={1080}
        src={imageSrc}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center z-10  bg-black bg-opacity-30 hover:bg-opacity-0 transition-all duration-300">
        <Link
          href={href || ''}
          className="text-[32px] font-light text-white hover:bg-purple-500 transition-all duration-300 px-6 py-2 rounded-lg"
        >
          {title}
        </Link>
      </div>
    </Card>
  );
};

export default CardExplore;
