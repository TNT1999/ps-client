import classNames from 'classnames';
import { FunctionComponent } from 'react';

const Divider: FunctionComponent<{ text?: string; className?: string }> = ({
  text,
  className
}) => {
  return (
    <div className={classNames('flex justify-center', className)}>
      <div className="relative w-full flex justify-center">
        <div className="absolute top-1/2 border-t border-gray-200 left-0 w-full"></div>
        {text && (
          <div className="bg-white relative z-10 px-2 text-gray-400 text-sm">
            {text}
          </div>
        )}
      </div>
    </div>
  );
};
export default Divider;
