import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import Logo from './logo';

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <div className="w-full h-[766px] bg-yellow-300 flex-shrink-0 flex flex-col items-center">
      <div className="relative w-[80%] h-[50%]">
        <Image
          src="/images/pexels-pixabay-416024.jpg"
          width={1920}
          height={1277}
          className="object-cover w-full h-full"
          quality={100}
          alt=""
        />
        <div className="absolute inset-0 flex flex-col p-16 bg-neutral-800 z-10 bg-opacity-50 hover:bg-opacity-30 transition-all duration-300">
          <div className="flex flex-col">
            <div className="text-white text-[67px] font-medium tracking-wide">
              Subscribe to
            </div>
            <div className="text-white text-[67px] font-medium tracking-wide">
              Our Newsletter
            </div>
          </div>
          <div className="flex items-center">
            <div className=" text-white text-xl font-medium leading-loose tracking-tight">
              Get weekly update about our product on your email, no spam
              guaranteed we promise
            </div>
            <div className="w-[50%] h-[60px] flex">
              <Input
                placeholder="Enter your email address..."
                type="email"
                className="bg-white w-full h-full rounded-md ml-8"
              />
              <Button className="h-full">
                <div className="text-white text-lg font-medium">Subscribe</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[80%] h-full justify-between flex items-center">
        <div>
          <Logo />
          <div className="flex items-center gap-x-6 mt-8">
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
        <div className="flex items-center gap-x-20">
          <div className="flex flex-col items-start gap-y-6">
            <div className="text-black text-2xl font-medium leading-[18px]">
              Resources
            </div>
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
            <div className="text-black text-2xl font-medium leading-[18px]">
              Travelers
            </div>
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
            <div className="text-black text-2xl font-medium leading-[18px]">
              Company
            </div>
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
    </div>
  );
};

export default Footer;
