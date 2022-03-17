import classNames from 'classnames';
import { noop } from 'lodash';
import { useEffect, useState, useRef, FunctionComponent } from 'react';
import { createPortal } from 'react-dom';

type OnClose = { onClose?: () => void };

export const Modal: FunctionComponent<
  OnClose & {
    droppable?: boolean;
    supportedFileTypes?: string[];
    maxSize?: number;
    dropTitle?: string;
    onDrop?: (files: File[], event: DragEvent) => void;
    width?: number | string;
    height?: number | string;
    modalBackgroundColor?: string;
    containerClassName?: string;
    className?: string;
    shadow?: string;
    rounded?: string;
    selector?: Element;
  }
> = ({
  onClose,
  selector,
  children,
  droppable = false,
  supportedFileTypes,
  maxSize,
  dropTitle = 'Drop to upload',
  onDrop = noop,
  width = 960,
  modalBackgroundColor = 'bg-gray-50',
  containerClassName,
  className,
  height,
  shadow = 'shadow-lg',
  rounded = 'rounded-xl'
}) => {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<Element>();

  useEffect(() => {
    ref.current = selector;
    setMounted(true);
  }, [selector]);

  return mounted
    ? createPortal(
        <div
          className={`fixed z-30 top-0 left-0 h-screen w-screen flex justify-center items-center bg-primary bg-opacity-5 select-none ${className}`}
          style={{ backdropFilter: 'blur(1px)' }}
          onClick={(event) => {
            event.stopPropagation();
            if (onClose != null) {
              onClose();
            }
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={classNames(
              'flex flex-col',
              containerClassName,
              modalBackgroundColor,
              shadow,
              rounded
            )}
            style={{ width, height }}
          >
            {children}
          </div>
        </div>,
        ref.current || document.body
      )
    : null;
};

export type ModalComponent = FunctionComponent<OnClose>;
