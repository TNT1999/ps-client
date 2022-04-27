import { styled } from '@nextui-org/react';
import { TYPE } from '@utils/constants';
import classNames from 'classnames';
import { FunctionComponent } from 'react';
type Props = {
  /**
   * The animation delay which determine when to close the toast
   */
  countdown: boolean | number;
  /**
   * Whether or not the animation is running or paused
   */
  pauseCountdown?: boolean;

  /**
   * Func to when countdown animation completes
   */
  onCountdown?: () => void;

  /**
   * Support rtl content
   */
  rtl?: boolean;

  /**
   * Optional type : info, success ...
   */
  type?: string;

  /**
   * Optional className
   */
  className?: string;

  /**
   * Progress value (0-100)
   */
  value?: number;
};
const LinearProgress: FunctionComponent<Props> = ({
  value,
  type = TYPE.DEFAULT,
  countdown,
  pauseCountdown,
  onCountdown
}) => {
  const style = {
    countdown: {
      transformOrigin: 'left',
      animation: `countdown ${Number(countdown)}ms linear forwards`,
      animationPlayState: `${pauseCountdown ? 'paused' : 'running'}`
    },
    width: {
      width: `${value ? value : countdown ? 100 : 0}%`
    }
  };
  return (
    <div className="w-full h-[3px] bg-[#BCC0CD] origin-left">
      <div
        onAnimationEnd={onCountdown && onCountdown}
        className={classNames('h-full bg-[#616C7A]', {
          'bg-[#00AD9E]': type === TYPE.SUCCESS,
          'bg-[#FFB81C]': type === TYPE.WARNING,
          'bg-[#D56262]': type === TYPE.ERROR
        })}
        style={countdown ? { ...style.countdown, ...style.width } : style.width}
      ></div>
    </div>
  );
};

export default LinearProgress;
