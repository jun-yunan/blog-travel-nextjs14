import { FunctionComponent } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import CardDestinations from './card-destinations';

interface CarouselTravelProps {}

const listPlaces = [
  {
    imageSrc: '/images/thailand.jpg',
    title: 'THAILAND',
    description: 'Chiang Rai',
  },
  {
    imageSrc: '/images/pexels-sudipta-1603650.jpg',
    title: 'INDIA',
    description: 'The Taj Mahal',
  },
  {
    imageSrc: '/images/pexels-brettstone-2845013.jpg',
    title: 'AUSTRALIA',
    description: 'Sydney',
  },
  {
    imageSrc: '/images/pexels-brettstone-2845013.jpg',
    title: 'AUSTRALIA',
    description: 'Sydney',
  },
  {
    imageSrc: '/images/pexels-brettstone-2845013.jpg',
    title: 'AUSTRALIA',
    description: 'Sydney',
  },
  {
    imageSrc: '/images/pexels-brettstone-2845013.jpg',
    title: 'AUSTRALIA',
    description: 'Sydney',
  },
  {
    imageSrc: '/images/pexels-brettstone-2845013.jpg',
    title: 'AUSTRALIA',
    description: 'Sydney',
  },
];

const CarouselTravel: FunctionComponent<CarouselTravelProps> = () => {
  return (
    <Carousel
      opts={{
        align: 'center',
      }}
      className="w-full"
    >
      <CarouselContent className="gap-x-9 flex">
        {listPlaces.map((place, index) => (
          <CardDestinations key={index} {...place} />
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselTravel;
