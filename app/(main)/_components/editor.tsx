'use client';

import React, {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Quill, { type QuillOptions } from 'quill';
import { Delta, Op } from 'quill/core';
import 'quill/dist/quill.snow.css';
import { cn } from '@/lib/utils';
import { UseFormReturn } from 'react-hook-form';
import { useBlogStore } from '@/hooks/useBlogStore';

type EditorValue = {
  image: File | null;
  body: string;
};

interface EditorProps {
  form: UseFormReturn<
    {
      title: string;
      content: string;
      tags?: string[];
    },
    unknown,
    undefined
  >;
  onSubmit: ({ image, body }: EditorValue) => void;
  onCancel?: () => void;
  placeholder?: string;
  defaultValue?: Delta | Op[];
  disabled?: boolean;
  innerRef?: MutableRefObject<Quill | null>;
}

const Editor = ({
  onSubmit,
  defaultValue = [],
  disabled = false,
  innerRef,
  onCancel,
  placeholder = 'Write something...',
  form,
}: EditorProps) => {
  const [text, setText] = React.useState('');

  const containerRef = useRef<HTMLDivElement>(null);

  const { setWriteBlog } = useBlogStore();

  const submitRef = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const disabledRef = useRef(disabled);

  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement('div'),
    );

    const options: QuillOptions = {
      theme: 'snow',
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          ['link', 'image'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean'],
        ],
      },
    };
    const quill = new Quill(editorContainer, options);

    quillRef.current = quill;
    quillRef.current.focus();

    if (innerRef) {
      innerRef.current = quill;
    }

    quill.setContents(defaultValueRef.current);
    setText(quill.getText());

    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText());
      console.log(quill.getContents());
      // console.log(quill.root.innerHTML);
      setWriteBlog({ content: quill.root.innerHTML });
      // form.setValue('content', quill.root.innerHTML);
      form.setValue('content', JSON.stringify(quill.getContents()));
    });

    return () => {
      quill.off(Quill.events.TEXT_CHANGE);
      if (container) {
        container.innerHTML = '';
      }
      if (quillRef.current) {
        quillRef.current = null;
      }
      if (innerRef) {
        innerRef.current = null;
      }
    };
  }, [form, innerRef, setWriteBlog]);

  return (
    <div className="flex flex-col w-full h-full">
      <div
        className={cn(
          'flex flex-col h-full w-full border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white',
          disabled && 'opacity-50',
        )}
      >
        <div ref={containerRef} className="h-full ql-custom" />
      </div>
    </div>
  );
};

export default Editor;
