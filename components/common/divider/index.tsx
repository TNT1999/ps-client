import { FunctionComponent } from 'react';

const Divider: FunctionComponent<{ text: string }> = ({ text }) => {
  return (
    <div className="flex justify-center my-5">
      <div className="relative w-full flex justify-center">
        <div className="absolute top-1/2 border-t border-gray-200 left-0 w-full"></div>
        <div className="bg-white relative z-10 px-2 text-gray-400 text-sm">
          {text}
        </div>
      </div>
    </div>
  );
};
export default Divider;
