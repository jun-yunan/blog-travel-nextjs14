import axios from 'axios';

export const logout = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-out`,
      {
        withCredentials: true,
      },
    );

    if (response.status === 200 && response.data) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.log(error);
  }
};
