import { db } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';

const PrimaryBlog = async () => {
  const primaryBlog = await db.blog.findUnique({
    where: {
      id: '676baa43a31e7721e60ea1d6',
    },
  });

  return (
    <Link
      href={`/blogs/${primaryBlog?.id}`}
      className="w-[50%] shadow-lg h-full flex flex-col items-start transition-all duration-300 hover:bg-opacity-75 bg-slate-100 rounded-lg overflow-hidden"
    >
      <Image
        src={primaryBlog?.imageUrl || ''}
        alt={primaryBlog?.title || ''}
        width={700}
        height={500}
        className="object-cover w-[700px] h-[500px] hover:opacity-80 transition-all duration-300 hover:scale-105"
      />
      <div className="flex flex-col items-start gap-y-7 p-3">
        <p className="text-4xl font-medium leading-tight hover:underline">
          {primaryBlog?.title}
        </p>
        <p className="text-base font-light leading-tight">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum in vel
          massa donec sit.
        </p>
      </div>
    </Link>
  );
};

export default PrimaryBlog;
