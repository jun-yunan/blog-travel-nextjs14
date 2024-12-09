import { updateUserAvatar } from '@/api/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserStore } from '@/hooks/useUserStore';
import { queryClient } from '@/providers/tanstack-query-provider';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { CloudUpload, Loader2, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function DialogUploadImage() {
  const { openDialogUploadImage, setOpenDialogUploadImage, user } =
    useUserStore();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  useEffect(() => {
    if (!openDialogUploadImage) {
      setImage(null);
    }
  }, [openDialogUploadImage]);

  const {
    mutate: updateAvatar,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationKey: ['upload-image'],
    mutationFn: updateUserAvatar,
    onSuccess: () => {
      toast.success('Profile picture updated successfully.');
      setOpenDialogUploadImage(false);
      queryClient.invalidateQueries({ queryKey: ['currentUser', 'user'] });
    },
    onError: (error) => {
      console.log(error);

      if (axios.isAxiosError(error)) {
        if (error.response?.data.message) {
          toast.error(error.response?.data.message);
        } else {
          toast.error(error.response?.data);
        }
      } else {
        toast.error('An error occurred. Please try again.');
      }
    },
  });

  const handleUpload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!image) {
      return toast.error('Please select an image to upload');
    }
    updateAvatar({ image });
  };

  return (
    <Dialog
      open={openDialogUploadImage}
      onOpenChange={setOpenDialogUploadImage}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload new Picture</DialogTitle>
          <DialogDescription>
            Upload a new picture to update your profile
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-y-6">
          {image ? (
            <div
              onClick={() => inputRef.current?.click()}
              className="relative w-[150px] h-[150px] rounded-full overflow-hidden hover:cursor-pointer"
            >
              {isPending && (
                <div className="absolute inset-0 bg-gray-500 bg-opacity-50 animate-pulse"></div>
              )}
              <Image
                src={URL.createObjectURL(image)}
                alt=""
                width={150}
                height={150}
                className="w-full h-full object-cover"
              />
            </div>
          ) : user?.imageUrl ? (
            <Avatar
              className="w-[150px] h-[150px] cursor-pointer"
              onClick={() => inputRef.current?.click()}
            >
              <AvatarImage
                className="object-cover"
                src={user.imageUrl}
                alt={`@${user.username}`}
              />
              <AvatarFallback>
                <Loader2 className="animate-spin" />
              </AvatarFallback>
            </Avatar>
          ) : (
            <Avatar
              className="w-[150px] h-[150px] cursor-pointer hover:opacity-75"
              onClick={() => inputRef.current?.click()}
            >
              <AvatarImage
                className="object-cover"
                src=""
                alt={`@${user?.username}`}
              />
              <AvatarFallback>
                <Loader2 className="animate-spin" />
              </AvatarFallback>
            </Avatar>
          )}
          <form onSubmit={handleUpload} className="space-y-6 flex flex-col">
            <Input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              ref={inputRef}
              className="mt-1 cursor-pointer"
              disabled={isPending}
              onChange={handleOnChange}
            />

            <Button disabled={isPending} type="submit">
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <CloudUpload />
                  Upload
                </>
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
