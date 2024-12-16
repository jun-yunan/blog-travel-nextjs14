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
import { ImageIcon, Loader2, Smile, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { EmojiPopover } from './emoji-popover';
// import { EmojiPopover } from '../write-blog/_components/emoji-popover';

export type EditorValue = {
  image: File | null;
  content: string;
};

interface CommentFieldProps {
  innerRef?: MutableRefObject<Quill | null>;
  onSubmit: ({ image, content }: EditorValue) => void;
  defaultValue?: Delta | Op[];
  disabled?: boolean;
  placeholder?: string;
  isSended?: boolean;
}

const CommentField = ({
  innerRef,
  onSubmit,
  defaultValue = [],
  disabled = false,
  isSended = false,
  placeholder = 'Write a comment...',
}: CommentFieldProps) => {
  const [text, setText] = useState('');

  const [image, setImage] = useState<File | null>(null);

  const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

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
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          ['link'],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: 'Enter',
              handler: () => {
                const text = quill.getText();
                const addedImage = imageElementRef.current?.files?.[0] || null;
                const isEmpty =
                  !addedImage &&
                  text.replace(/<(.|\n)*?>/g, '').trim().length === 0;
                if (isEmpty) {
                  return;
                }
                const content = JSON.stringify(quill.getContents());
                submitRef.current?.({ content, image: addedImage });
              },
            },
            shift_enter: {
              key: 'Enter',
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, '\n');
              },
            },
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
  }, [innerRef, isSended]);
  const toggleToolbar = () => {
    setIsToolbarVisible((prev) => !prev);
    const toolbarElement = containerRef.current?.querySelector('.ql-toolbar');

    if (toolbarElement) {
      toolbarElement.classList.toggle('hidden');
    }
  };

  const onEmojiSelect = (emoji: { native: string }) => {
    const quill = quillRef.current;
    quill?.insertText(quill?.getSelection()?.index || 0, emoji.native);
  };

  const isEmpty = !image && text.replace(/<(.|\n)*?>/g, '').trim().length === 0;

  return (
    <div className="flex flex-col flex-shrink-0">
      <input
        type="file"
        accept="image/*"
        ref={imageElementRef}
        onChange={(event) => setImage(event.target.files![0])}
        className="hidden"
      />
      <div
        className={cn(
          'flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white',
          disabled && 'opacity-50',
        )}
      >
        <div ref={containerRef} className="h-full ql-custom" />
        {!!image && (
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
        )}
        <div className="flex px-2 pb-2 z-[5]">
          <Button
            disabled={disabled}
            size="icon"
            variant="ghost"
            onClick={toggleToolbar}
          >
            <PiTextAa className="size-4" />
          </Button>
          <EmojiPopover onEmojiSelect={onEmojiSelect}>
            <Button disabled={false} size="icon" variant="ghost" type="button">
              <Smile className="size-4" />
            </Button>
          </EmojiPopover>

          <Button
            disabled={false}
            size="icon"
            variant="ghost"
            type="button"
            onClick={() => imageElementRef.current?.click()}
          >
            <ImageIcon className="size-4" />
          </Button>

          <Button
            disabled={disabled || isEmpty}
            onClick={() => {
              onSubmit({
                content: JSON.stringify(quillRef.current?.getContents()),
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
            {disabled ? (
              <Loader2 className="animate-spin" />
            ) : (
              <MdSend className="size-4" />
            )}
          </Button>
        </div>
      </div>
      <div className="p-2 text-[10px] text-muted-foreground flex justify-end">
        <p>
          <strong>Shift + Return</strong> to add a new line
        </p>
      </div>
    </div>
  );
};

export default CommentField;
