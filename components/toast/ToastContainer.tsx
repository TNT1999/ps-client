import {
  cloneElement,
  FunctionComponent,
  isValidElement,
  useCallback,
  useEffect,
  useState
} from 'react';
import { ACTION, POSITION } from '@utils/constants';
import eventManager from '@utils/eventManager';
import CloseButton from './CloseButton';
import { noop } from '@utils/index';
import Toast from './Toast';
type ToastProps = {
  position: string;
  autoClose: boolean | number;
  closeButton: boolean | FunctionComponent;
  hideProgressBar: boolean;
  pauseOnHover: boolean;
  closeOnClick: boolean;
  className: string;
  style: object;
  toastClassName: string;
  bodyClassName: string;
  progressClassName: string;
  progressStyle: string;
  transition?: () => void;
  rtl: boolean;
  draggable: boolean;
  draggablePercent: number;
  pauseOnFocusLoss: boolean;
  newestOnTop: boolean;
};

const ToastContainer: FunctionComponent<ToastProps> = ({
  position = POSITION.TOP_RIGHT,
  transition = noop,
  rtl = false,
  autoClose = 5000,
  hideProgressBar = false,
  closeButton = <CloseButton />,
  pauseOnHover = true,
  pauseOnFocusLoss = true,
  closeOnClick = true,
  newestOnTop = false,
  draggable = true,
  draggablePercent = 80,
  className = null,
  style = null,
  toastClassName = null,
  bodyClassName = null,
  progressClassName = null,
  progressStyle = null
}) => {
  const [toasts, setToasts] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(true);
  const toastKey = 1;
  const collection = {};

  const bindFocusEvents = () => {
    window.addEventListener('focus', () => setIsRunning(true));
    window.addEventListener('blur', () => setIsRunning(false));
  };

  const unbindFocusEvents = () => {
    window.removeEventListener('focus', () => setIsRunning(true));
    window.removeEventListener('blur', () => setIsRunning(false));
  };
  const isToastActive = (id: string) => {
    return toasts.indexOf(id) !== -1;
  };
  const clear = () => {
    setToasts([]);
  };
  const removeToast = (id: string) => {
    setToasts(toasts.filter((i) => i != id));
  };

  const dispatchChange = useCallback(() => {
    eventManager.emit(ACTION.ON_CHANGE, toasts.length);
  }, [toasts.length]);

  useEffect(() => {
    dispatchChange();
  }, [dispatchChange, toasts.length]);

  const makeCloseButton = (toastClose, toastId, type) => {
    if (isValidElement(toastClose) || toastClose === false) {
      closeButton = toastClose;
    }
    return closeButton === false
      ? false
      : cloneElement(closeButton, {
          closeToast: () => removeToast(toastId),
          type: type
        });
  };
  const makeToast = (options: any) => {
    return (
      <Toast
        {...options}
        isRunning={isRunning}
        pauseToast={() => setIsRunning(false)}
        playToast={() => setIsRunning(true)}
        key={`toast-${options.key}`}
      >
        {options && options.content}
      </Toast>
    );
  };

  const renderToast = () => {
    const toastToRender = {};
    const collectionKey = Object.keys(collection);

    // group toast by position
    collectionKey.forEach((toastId) => {
      const { position, options } = collection[toastId];
      toastToRender[position] || (toastToRender[position] = []);

      if (toasts.indexOf(options.id) !== -1) {
        toastToRender[position].push(makeToast(options));
      } else {
        toastToRender[position].push(null);
        delete collection[toastId];
      }
    });

    return Object.keys(toastToRender).map((position) => {
      const disablePointer =
        toastToRender[position].length === 1 &&
        toastToRender[position][0] === null;
      const props = {
        style: disablePointer
          ? { ...style, pointerEvents: 'none' }
          : { ...style }
      };

      return (
        // eslint-disable-next-line react/jsx-no-undef
        // <ToastContainerWrap {...props} key={`container-${position}`}>
        //   {toastToRender[position]}
        // </ToastContainerWrap>
        <div key={position}></div>
      );
    });
  };
  useEffect(() => {
    bindFocusEvents();
    eventManager
      .on(ACTION.SHOW, noop)
      .on(ACTION.CLEAR, (id) => (!id ? clear() : removeToast(id)))
      .emit(ACTION.DID_MOUNT, this);
    return () => {
      unbindFocusEvents();
      eventManager.off(ACTION.SHOW).off(ACTION.CLEAR).emit(ACTION.WILL_UNMOUNT);
    };
  }, []);
  return (
    <div
      onMouseEnter={() => setIsRunning(false)}
      onMouseLeave={() => setIsRunning(true)}
    >
      {renderToast()}
    </div>
  );
};
