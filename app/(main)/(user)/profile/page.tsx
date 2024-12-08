import Image from 'next/image';
import { FunctionComponent } from 'react';

interface ProfilePageProps {}

const ProfilePage: FunctionComponent<ProfilePageProps> = () => {
  return (
    <div className="w-[75%] h-[1500px] bg-purple-200">
      <div className="relative w-full h-[300px]">
        <Image
          src="/images/pexels-binh-ho-image-355440-1018478.jpg"
          alt=""
          width={1920}
          height={1080}
          className="w-full h-full object-cover flex-shrink-0 rounded-xl"
        />
        <div className="absolute -bottom-[75px] left-[75px] bg-slate-500 gap-x-6 flex items-center">
          <div className="w-[150px] h-[150px] bg-purple-400 rounded-full"></div>
          <p className="text-2xl font-semibold">Jun Yunan</p>
        </div>
      </div>
      <h1>Profile</h1>
    </div>
  );
};

export default ProfilePage;
