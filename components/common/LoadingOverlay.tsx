import React, { FunctionComponent } from 'react';
import { SpinnerIcon } from '@assets/icons';

const LoadingOverlay: FunctionComponent = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center fixed top-0 left-0 z-50 bg-white select-none">
      <div className="flex items-center">
        <SpinnerIcon className="animate-spin mr-2" /> Loading...
      </div>
    </div>
  );
};

export default LoadingOverlay;
