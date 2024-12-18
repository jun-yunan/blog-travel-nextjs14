'use client';

import { cn } from '@/lib/utils';
import { FunctionComponent, useState } from 'react';

interface TestPageProps {}

const TestPage: FunctionComponent<TestPageProps> = () => {
  const [running, setRunning] = useState(false);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        onClick={() => setRunning((prev) => !prev)}
        className={cn(
          'size-36 bg-zinc-900 m-auto animate-bounce',
          running ? 'running' : 'paused',
        )}
      ></div>
      <div
        className={cn('size-36 bg-zinc-900 m-auto animate-in spin-in-90')}
      ></div>
    </div>
  );
};

export default TestPage;
