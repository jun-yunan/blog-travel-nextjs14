'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent, useEffect, useRef } from 'react';
import Logo from './logo';
import useFooterStore from '@/store/footerStore';

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  const setFooterVisible = useFooterStore((state) => state.setFooterVisible);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    const currentFooterRef = footerRef.current;

    if (currentFooterRef) observer.observe(currentFooterRef);

    return () => {
      if (currentFooterRef) observer.disconnect();
    };
  }, [setFooterVisible]);

  return (
    <footer
      ref={footerRef}
      className="w-full h-[766px] bg-yellow-300 flex-shrink-0 justify-between flex flex-col items-center"
    >
      <div className="relative lg:w-[80%] w-full h-[50%]">
        <Image
          src="/images/pexels-pixabay-416024.jpg"
          width={1920}
          height={1277}
          className="object-cover w-full h-full"
          quality={100}
          alt=""
        />
        <div className="absolute inset-0 w-full flex flex-col gap-y-4 justify-center lg:p-16 p-2 bg-neutral-800 z-10 bg-opacity-50 hover:bg-opacity-30 transition-all duration-300">
          <div className="flex lg:flex-col self-start flex-row gap-2 items-center">
            <p className="text-white text-xl lg:text-6xl font-medium tracking-wide">
              Subscribe to Our Newsletter
            </p>
          </div>
          <div className="flex lg:flex-row flex-col items-center w-full">
            <div className="text-sm text-white lg:text-xl font-medium leading-loose tracking-tight">
              Get weekly update about our product on your email, no spam
              guaranteed we promise
            </div>
            <div className="lg:w-[50%] w-full lg:h-[60px] flex">
              <Input
                placeholder="Enter your email address..."
                type="email"
                className="bg-white w-full h-full rounded-md lg:ml-8 placeholder:text-sm"
              />
              <Button className="lg:h-full">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-3">
        <Logo />
        <div className="flex items-center gap-x-6">
          <Link href="" className="text-black hover:underline">
            <Image
              src="/icons/icons8-facebook-48.png"
              width={38}
              height={38}
              alt=""
            />
          </Link>
          <Link href="" className="text-black hover:underline">
            <Image
              src="/icons/icons8-instagram-48.png"
              width={38}
              height={38}
              alt=""
            />
          </Link>
          <Link href="" className="text-black hover:underline">
            <Image
              src="/icons/icons8-pinterest-48.png"
              width={38}
              height={38}
              alt=""
            />
          </Link>
          <Link href="" className="text-black hover:underline">
            <Image
              src="/icons/icons8-twitter-50.png"
              width={38}
              height={38}
              alt=""
            />
          </Link>
        </div>
      </div>
      <div className="lg:w-[80%] w-full flex flex-col items-center">
        <div className="flex items-center lg:gap-x-20 justify-between w-full gap-x-2 pb-8">
          <div className="flex flex-col items-start gap-y-6">
            <div className="text-black text-2xl font-medium">Resources</div>
            <div className="flex text-black flex-col items-start">
              <Link href="" className="text-black hover:underline">
                Download
              </Link>
              <Link href="" className="text-black hover:underline">
                Help Center
              </Link>
              <Link href="" className="text-black hover:underline">
                Guide Book
              </Link>
              <Link href="" className="text-black hover:underline">
                App Directory
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start gap-y-6">
            <div className="text-black text-2xl font-medium">Travelers</div>
            <div className="flex text-black flex-col items-start">
              <Link href="" className="text-black hover:underline">
                Why Travelers
              </Link>
              <Link href="" className="text-black hover:underline">
                Enterprise
              </Link>
              <Link href="" className="text-black hover:underline">
                Customer Stories
              </Link>
              <Link href="" className="text-black hover:underline">
                Instagram post
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start gap-y-6">
            <div className="text-black text-2xl font-medium">Company</div>
            <div className="flex text-black flex-col items-start">
              <Link href="" className="text-black hover:underline">
                Traveling
              </Link>
              <Link href="" className="text-black hover:underline">
                About Locate
              </Link>
              <Link href="" className="text-black hover:underline">
                Success
              </Link>
              <Link href="" className="text-black hover:underline">
                Information
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
