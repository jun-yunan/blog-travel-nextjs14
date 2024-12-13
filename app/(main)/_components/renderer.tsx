import { FunctionComponent, useEffect, useRef, useState } from 'react';
import Quill from 'quill';

interface RendererProps {
  value: string;
}

const Renderer: FunctionComponent<RendererProps> = ({ value }) => {
  const [isEmpty, setIsEmpty] = useState(false);
  const rendererRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rendererRef.current) return;

    const container = rendererRef.current;

    const quill = new Quill(document.createElement('div'), {
      theme: 'snow',
    });

    quill.enable(false);

    const contents = JSON.parse(value);

    quill.setContents(contents);

    const isEmpty =
      quill
        .getText()
        .replace(/<(.|\n)*?>/g, '')
        .trim().length === 0;

    setIsEmpty(isEmpty);

    container.innerHTML = quill.root.innerHTML;

    return () => {
      container.innerHTML = '';
    };
  }, [value]);

  if (isEmpty) return null;

  return <div className="prose" ref={rendererRef} />;
};

export default Renderer;
