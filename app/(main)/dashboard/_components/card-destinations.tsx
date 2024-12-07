/* eslint-disable @next/next/no-img-element */
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface CardDestinationsProps {
  imageSrc: string;
  title: string;
  description: string;
  href?: string;
}

const CardDestinations: FunctionComponent<CardDestinationsProps> = ({
  imageSrc,
  title,
  href,
  description,
}) => {
  return (
    <Link
      href={href || ''}
      className="hover:underline hover:opacity-80 transition-all duration-300"
    >
      <Card className="h-[420px] w-[380px] flex flex-col flex-shrink-0 overflow-hidden">
        <Image
          width={1920}
          height={1080}
          src={imageSrc}
          alt={title}
          className="w-full h-[80%] object-cover"
        />
        <div className="flex flex-col items-start p-6 bg-yellow-400">
          <p className="text-5xl font-bold">{title}</p>
          <p className="text-[32px] font-normal">{description}</p>
        </div>
      </Card>
    </Link>
  );
};

export default CardDestinations;
