import classNames from 'classnames';
import { FunctionComponent } from 'react';

type Props = {
  total: number;
  progress: number;
  className?: string;
};
const Progress: FunctionComponent<Props> = ({ total, progress, className }) => {
  const percent = total === 0 ? 0 : Math.round((progress / total) * 100);
  return (
    <div
      className={classNames(
        'w-full bg-gray-200 rounded-md h-2.5 p-0.5 overflow-hidden',
        className
      )}
    >
      <div
        className="rounded-full bg-red-500"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

export default Progress;
