import { EditorValue } from '@/app/(main)/_components/comment-field';
import axios from 'axios';

export const createComment = async ({
  data,
  blogId,
}: {
  data: EditorValue;
  blogId: string;
}) => {
  const formData = new FormData();
  formData.set('content', data.content);
  if (data.image) {
    formData.set('image', data.image);
  }

  console.log(formData);

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/${blogId}`,
    formData,
    {
      withCredentials: true,
    },
  );

  if (response.data && response.status === 200) {
    return response.data;
  }

  return null;
};
