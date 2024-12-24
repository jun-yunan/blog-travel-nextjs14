import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import '@uploadthing/react/styles.css';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

import { UploadButton, UploadDropzone } from '@/utils/uploadthing';
import { MessageCircle, SendHorizontal, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schemaChat = z.object({
  message: z.string(),
});

export function ChatPopover({ children }: { children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof schemaChat>>({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof schemaChat>) => {
    console.log(data);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="fixed bottom-10 right-10 bg-purple-500 shadow-xl drop-shadow-lg hover:scale-110 transition-all duration-300 ease-in-out text-white p-4 rounded-full cursor-pointer">
          <div className="fixed top-0 right-0">
            <div className="bg-rose-500 animate-pulse size-4 rounded-full"></div>
          </div>
          <MessageCircle className="h-6 w-6" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="lg:w-[600px] lg:h-[500px]">
        <div className="flex flex-col h-full w-full">
          <div className="w-full h-[60px] flex items-center justify-between">
            <div>
              <p className="text-base font-semibold">Chat</p>
            </div>

            <div
              onClick={() => setIsOpen(false)}
              className="cursor-pointer p-2 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </div>
          </div>
          <div className="w-full h-full flex gap-x-3">
            <Card className="w-[40%] h-full">
              <div className="flex w-full items-center p-2 justify-center">
                <Input
                  className="w-full"
                  placeholder="Search conversations..."
                />
              </div>
              <Separator />
              <div>{}</div>
            </Card>
            <Card className="flex-1 flex flex-col items-start">
              <div>Conversation</div>
              <Separator />
              <div className="flex-1">
                <p className="text-center">Create a new conversation</p>
              </div>
              <Separator />
              <Form {...form}>
                <form
                  className="flex items-center w-full h-[60px]"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Type your message..."
                            {...field}
                            className="w-full focus-visible:ring-0"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {/* <div>
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        console.log(res);
                      }}
                      onUploadError={(err) => {
                        console.log(err);
                      }}
                    />
                  </div> */}
                  <Button type="submit" variant="ghost">
                    <SendHorizontal />
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
