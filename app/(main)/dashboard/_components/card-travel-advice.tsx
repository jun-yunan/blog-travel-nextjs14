/* eslint-disable @next/next/no-img-element */
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface CardTravelAdviceProps {
  imageSrc: string;
  title: string;
  description: string;
  href?: string;
}

const CardTravelAdvice: FunctionComponent<CardTravelAdviceProps> = ({
  description,
  imageSrc,
  title,
  href,
}) => {
  return (
    <Link href={href || ''}>
      <Card className="relative w-[280px] h-[400px] overflow-hidden rounded-md">
        <Image
          width={1920}
          height={1080}
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-neutral-800 bg-opacity-50 hover:bg-opacity-20 transition-all duration-300"></div>
        <div className="absolute top-[70%] hover:underline right-4 left-4 z-10 flex flex-col items-start gap-y-2 text-white">
          <p className="text-2xl font-normal">{title}</p>
          <p className="text-base font-light text-ellipsis">{description}</p>
        </div>
      </Card>
    </Link>
  );
};

export default CardTravelAdvice;
