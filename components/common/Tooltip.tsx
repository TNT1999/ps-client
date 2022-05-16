import { FunctionComponent } from 'react';
import cx from 'classnames';
type Props = {
  text: string;
  maxWidth?: number;
};
const Tooltip: FunctionComponent<Props> = ({ text, maxWidth }) => {
  return (
    <div className="flex items-center text-xs overflow-hidden bg-gray-800 text-white rounded p-1 gap-1">
      <span
        className={cx('px-1 leading-4', {
          'text-ellipsis-2-lines': maxWidth && maxWidth !== 0
        })}
        style={{ maxWidth: maxWidth !== 0 ? maxWidth : undefined }}
      >
        {text}
      </span>
    </div>
  );
};

export default Tooltip;
