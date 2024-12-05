'use client';

import { FunctionComponent } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastProviderProps {}

const ToastProvider: FunctionComponent<ToastProviderProps> = () => {
  return <ToastContainer />;
};

export default ToastProvider;
