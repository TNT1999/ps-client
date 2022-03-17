import { SpinnerIcon } from '@assets/icons';
import { FunctionComponent } from 'react';

const AuthSubmitButton: FunctionComponent<{
  disable?: boolean;
  isLoading: boolean;
  width: number | string;
  title: string;
}> = ({ disable = false, isLoading, title, width }) => {
  return (
    <button
      disabled={disable}
      type="submit"
      style={{ width }}
      className="mt-3 h-12 flex items-center justify-center focus:outline-none bg-primary active:bg-primary px-6 rounded-md text-white transition-colors duration-200"
    >
      {isLoading ? (
        <SpinnerIcon className="animate-spin fill-current text-white" />
      ) : (
        title
      )}
    </button>
  );
};

export default AuthSubmitButton;
