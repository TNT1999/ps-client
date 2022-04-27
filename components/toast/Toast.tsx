import { CartIcon } from '@assets/icons';
import LinearProgress from '@components/common/LinearProgress';
import { TYPE } from '@utils/constants';
import cx from 'classnames';
import { FunctionComponent, useRef, useState } from 'react';
type Props = {
  closeButton: boolean | FunctionComponent;
  autoClose: boolean | number;
  children: React.ReactNode;
  closeToast: () => void;
  position: string;
  pauseOnHover: boolean;
  pauseOnFocusLoss: boolean;
  closeOnClick: boolean;
  transition: () => void;
  draggable: boolean;
  draggablePercent: number;
  in: boolean;
  onExited: () => void | any;
  onOpen: () => void;
  onClose: () => void;
  type: string;
  className: string;
  bodyClassName: string;
  progressClassName: string;
  progressStyle: string;
  progress: number;
  isProgressDone: boolean;
  updateId: string | number;
  ariaLabel: string;
};

const getX = (e: TouchEvent & MouseEvent) => {
  return e.targetTouches && e.targetTouches.length >= 1
    ? e.targetTouches[0].clientX
    : e.clientX;
};

const getY = (e: TouchEvent & MouseEvent) => {
  return e.targetTouches && e.targetTouches.length >= 1
    ? e.targetTouches[0].clientY
    : e.clientY;
};

const Toast: FunctionComponent<Props> = ({
  closeButton,
  children,
  autoClose,
  type,
  closeToast,
  title,
  transition: Transition,
  position,
  onExited,
  onClick,
  bodyClassName,
  role
}) => {
  const [isRunning, setIsRunning] = useState(true);
  const [preventExitTransition, setPreventExitTransition] = useState(false);
  const [element, setElement] = useState();
  const ToastRef = useRef<any>(null);
  const flag = {
    canCloseOnClick: true,
    canDrag: false
  };

  return (
    <div className=" pb-2 box-content hover:relative hover:z-[1] group">
      <div className="relative box-border rounded-md flex flex-col max-h-[800px] overflow-hidden cursor-pointer mr-6 duration-200 shadow-toast group-hover:shadow-toast-hover bg-white">
        <div className="flex">
          <div
            onClick={(e) => {
              onClick && onClick();
              flag.canCloseOnClick && closeToast();
            }}
            ref={ToastRef}
            className={cx(
              'flex justify-center items-center w-14 text-[#616C7A]',
              {
                'bg-[] text-[#00AD9E]': type === TYPE.SUCCESS,
                'bg-[#FEF3E2] text-[#D07A00]': type === TYPE.WARNING,
                'bg-[] text-[#D56262]': type === TYPE.ERROR
              }
            )}
          >
            <CartIcon />
          </div>
          <div className="flex-1 p-5 self-center">
            {title && (
              <h4
                className={cx('p-0 font-bold text-base text-[#0E1E25]', {
                  'm-[0 0 8px 0]': children,
                  'm-0': !children
                })}
              >
                {title}
              </h4>
            )}
            {children && (
              <div className=" text-[#616C7A] text-sm">{children}</div>
            )}
          </div>
          <div className="p-3 pl-0">{closeButton && closeButton}</div>
        </div>

        {autoClose && (
          <LinearProgress
            countdown={autoClose}
            // pauseCountdown={!this.props.isRunning}
            onCountdown={closeToast}
            // closeToast={closeToast}
            type={type}
          />
        )}
      </div>
    </div>
  );
};

export default Toast;
