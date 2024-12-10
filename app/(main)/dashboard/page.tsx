import { FunctionComponent } from 'react';
import Image from 'next/image';
import CardBlog from './_components/card-blog';
import Link from 'next/link';
import CardTravelAdvice from './_components/card-travel-advice';
import CardExplore from './_components/card-explore';
import CarouselTravel from './_components/carousel-travel';

interface DashboardPageProps {}

const DashboardPage: FunctionComponent<DashboardPageProps> = () => {
  return (
    <div className="w-full flex flex-col items-center mb-[200px]">
      <div className="relative w-full flex flex-col h-[700px] flex-shrink-0">
        <Image
          className="absolute bottom-0 right-0 left-0 w-full h-[368px] object-cover"
          src="/images/unsplash.png"
          alt=""
          width={1920}
          quality={100}
          height={368}
          priority
        />
        <Image
          className="absolute z-10 right-[12%] bottom-0 w-[280px] h-[700px] object-cover"
          src="/images/thap-nghien.png"
          alt=""
          width={280}
          quality={100}
          height={700}
          priority
        />
        <div className="flex items-start flex-wrap flex-col left-[12%] absolute top-[20%] text-[40px] font-medium leading-[66px]">
          <p>Travel. It’s the best investment</p>
          <div className="flex items-center gap-4">
            <p>you can make.</p>
            <div className="hover:cursor-pointer rounded-md text-xl font-bold bg-purple-500 text-white py-4 px-6">
              EXPLORE WITH ME
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[180px] flex items-center w-[80%] gap-x-11">
        <div className="w-[50%] h-full flex flex-col items-start">
          <Image
            src="/images/paris.jpg"
            alt=""
            width={700}
            height={500}
            className="object-cover w-[700px] h-[500px]"
          />
          <div className="mt-[38px] flex flex-col items-start gap-y-7">
            <Link
              href=""
              className="text-4xl font-medium leading-tight hover:underline"
            >
              Solo Road trip to Paris
            </Link>
            <p className="text-base font-light leading-tight">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum in
              vel massa donec sit.
            </p>
          </div>
        </div>
        <div className="w-[50%] flex flex-col h-full items-start">
          <div className="mb-[35px] text-[32px] font-medium leading-tight">
            Recent Blogs
          </div>
          <div className="flex flex-col items-center w-full h-full gap-y-14">
            <CardBlog
              imageSrc="/images/opera-house-4338215_1920.jpg"
              title="Lorem ipsum dolor dolor sit amet, consectetur adipiscing"
            />
            <CardBlog
              imageSrc="/images/pexels-kirandeepsingh-20602154.jpg"
              title="Dolor sit amet, consectetur adipiscing massa donec sit"
            />
            <CardBlog
              imageSrc="/images/pexels-binh-ho-image-355440-1018478.jpg"
              title="Lorem ipsum dolor sit amet. dolor sit amet, consectetur"
            />
          </div>
        </div>
      </div>
      <div className="mt-[164px] w-[80%] flex flex-col items-center gap-y-14">
        <div className="text-[64px] font-bold leading-[50px]">
          Travel Advice
        </div>
        <div className="flex w-full items-center justify-center gap-x-9">
          <CardTravelAdvice
            imageSrc="/images/f71410171fe181b5b12b5ba671165149.jpg"
            title="Lorem ipsum dolor"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum in vel."
          />
          <CardTravelAdvice
            imageSrc="/images/264eb80b44d7ed514462fe42fd98ffb5.jpg"
            title="Ipsum lorem"
            description="Praesent accumsan augue ac ipsum convallis ullamcorpe."
          />
          <CardTravelAdvice
            imageSrc="/images/ec7ed278473890ea270d57db68d8ed54.jpg"
            title="Dolor sit amet, consectetur"
            description="Consectetur adipiscing elit. Cum in vel massa donec. "
          />
          <CardTravelAdvice
            imageSrc="/images/0261cb254690b34ec145b250cfc54306.jpg"
            title="Lorem ipsum."
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum in vel massa donec sit."
          />
        </div>
        <div className="self-end">
          <Link
            href=""
            className="text-2xl font-normal hover:underline leading-tight"
          >
            CHECK ALL TRAVEL ADVICE
          </Link>
        </div>
      </div>
      <div className="mt-[177px] w-full flex flex-col items-center gap-y-12">
        <div className="text-[64px] font-bold leading-[50px]">
          Explore By Style
        </div>
        <div className="flex items-center w-full">
          <CardExplore
            imageSrc="/images/pexels-thatguycraig000-1563356.jpg"
            title="ROAD TRIP"
            href=""
          />
          <CardExplore
            imageSrc="/images/cc3ab5cfc70f06c34cf80b3ca5cfcda9.jpg"
            title="BUGET TRAVEL"
            href=""
          />
          <CardExplore
            imageSrc="/images/a3aa67613fc5c779c3c551675979f545.jpg"
            title="SOLO TRAVEL"
            href=""
          />
        </div>
      </div>
      <div className="mt-[224px] w-[80%] flex flex-col items-start gap-y-11">
        <div className="text-[64px] font-bold leading-[50px]">Destinations</div>
        <CarouselTravel />
      </div>
      <div className="mt-[224px] w-[80%] flex items-center gap-x-8">
        <Image
          src="/images/author.png"
          alt=""
          width={680}
          height={620}
          className="object-cover w-[680px] h-[620px] flex-shrink-0"
        />
        <div className="flex flex-col items-start gap-y-4">
          <div className="flex flex-col gap-y-1">
            <div className=" text-[32px] font-normal leading-tight">MEET</div>
            <div className="text-9xl font-normal leading-tight">David</div>
          </div>
          <div className="text-xl font-normal leading-[25.14px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum in vel
            massa donec sit. Mi ut risus sem malesuada ornare. Ac eu erat eget
            et lorem est arcu. Gravida hendrerit sit blandit semper lacus. Nulla
            amet suscipit sit lectus tortor. Dolor non eget suspendisse leo
            scelerisque sed d.
          </div>
          <Link
            href=""
            className="hover:underline text-xl font-normal leading-tight"
          >
            Read More...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;