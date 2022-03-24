import classNames from 'classnames';
import { FunctionComponent } from 'react';

type Props = {
  total: number;
  progress: number;
  className?: string;
};
const Progress: FunctionComponent<Props> = ({ total, progress, className }) => {
  const percent = Math.round((progress / total) * 100);
  return (
    <div
      className={classNames(
        className,
        'w-full h-[10px] p-[2px] overflow-hidden bg-gray-300 rounded-md'
      )}
    >
      <div
        className="h-full rounded bg-red-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export default Progress;
