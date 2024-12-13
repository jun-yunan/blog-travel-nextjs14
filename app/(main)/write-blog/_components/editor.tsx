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
import { Button } from '@/components/ui/button';
import { PiTextAa } from 'react-icons/pi';
import { MdSend } from 'react-icons/md';
import { ImageIcon, Smile, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { EmojiPopover } from './emoji-popover';
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
  variant?: 'create' | 'update';
  field?: ControllerRenderProps<
    {
      title: string;
      author: string;
      content: string;
    },
    'content'
  >;
}

const Editor = ({
  variant = 'create',
  onSubmit,
  defaultValue = [],
  disabled = false,
  innerRef,
  onCancel,
  field,
  placeholder = 'Write something...',
  form,
}: EditorProps) => {
  const [text, setText] = React.useState('');

  const [image, setImage] = useState<File | null>(null);

  const [isToolbarVisible, setIsToolbarVisible] = React.useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const { setWriteBlog } = useBlogStore();

  const submitRef = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const disabledRef = useRef(disabled);
  const imageElementRef = useRef<HTMLInputElement>(null);

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
        imageResize: {
          modules: ['Resize', 'DisplaySize', 'Toolbar'], // Tùy chọn resize
        },
        keyboard: {
          bindings: {
            // enter: {
            //   key: 'Enter',
            //   shiftKey: false,
            //   handler: () => {
            //     quill.insertText(quill.getSelection()?.index || 0, '\n');
            //   },
            // },
            // enter: {
            //   key: 'Enter',
            //   handler: () => {
            //     const text = quill.getText();
            //     const addedImage = imageElementRef.current?.files?.[0] || null;
            //     const isEmpty =
            //       !addedImage &&
            //       text.replace(/<(.|\n)*?>/g, '').trim().length === 0;
            //     if (isEmpty) {
            //       return;
            //     }
            //     const body = JSON.stringify(quill.getContents());
            //     submitRef.current?.({ body, image: addedImage });
            //   },
            // },
            // shift_enter: {
            //   key: 'Enter',
            //   shiftKey: true,
            //   handler: () => {
            //     quill.insertText(quill.getSelection()?.index || 0, '\n');
            //   },
            // },
          },
        },
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
  }, [innerRef]);

  const toggleToolbar = () => {
    setIsToolbarVisible((prev) => !prev);
    const toolbarElement = containerRef.current?.querySelector('.ql-toolbar');

    if (toolbarElement) {
      toolbarElement.classList.toggle('hidden');
    }
  };

  const isEmpty = !image && text.replace(/<(.|\n)*?>/g, '').trim().length === 0;

  const onEmojiSelect = (emoji: { native: string }) => {
    const quill = quillRef.current;
    quill?.insertText(quill?.getSelection()?.index || 0, emoji.native);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <input
        type="file"
        accept="image/*"
        ref={imageElementRef}
        onChange={(event) => setImage(event.target.files![0])}
        className="hidden"
      />
      <div
        className={cn(
          'flex flex-col h-full w-full border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white',
          disabled && 'opacity-50',
        )}
      >
        {/* <div id="toolbar">
          <button className="ql-undo">Undo</button>
          <button className="ql-redo">Redo</button>
        </div> */}
        <div ref={containerRef} className="h-full ql-custom" />
        {/* {!!image && (
          <div className="p-2">
            <div className="relative size-[62px] flex items-center justify-center group/image">
              <button
                onClick={() => {
                  setImage(null);

                  imageElementRef.current!.value = '';
                }}
                className="hidden group-hover/image:flex rounded-full bg-black/70 hover:bg:black absolute -top-2.5 -right-2.5 text-white size-6 z-[4] border-white items-center justify-center"
              >
                <XIcon className="size-3.5" />
              </button>
              <Image
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                fill
                className="rounded-xl overflow-hidden border object-cover"
              />
            </div>
          </div>
        )} */}
        <div className="flex px-2 pb-2 z-[5]">
          <Button
            disabled={disabled}
            size="icon"
            variant="ghost"
            type="button"
            onClick={toggleToolbar}
          >
            <PiTextAa className="size-4" />
          </Button>
          <EmojiPopover onEmojiSelect={onEmojiSelect}>
            <Button
              disabled={false}
              size="icon"
              variant="ghost"
              type="button"
              //   onClick={() => {}}
            >
              <Smile className="size-4" />
            </Button>
          </EmojiPopover>
          {variant === 'create' && (
            <Button
              disabled={false}
              size="icon"
              variant="ghost"
              type="button"
              onClick={() => imageElementRef.current?.click()}
            >
              <ImageIcon className="size-4" />
            </Button>
          )}
          <Button
            disabled={disabled || isEmpty}
            onClick={() => {
              onSubmit({
                body: JSON.stringify(quillRef.current?.getContents()),
                image,
              });
            }}
            size="icon"
            type="button"
            className={cn(
              'ml-auto',
              isEmpty
                ? ' bg-white hover:bg-white text-muted-foreground'
                : ' bg-[#007a5a] hover:bg-[#007a5a]/80 text-white',
            )}
          >
            <MdSend className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
