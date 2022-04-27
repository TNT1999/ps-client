import { FunctionComponent } from 'react';
type Props = {
  onCancel: () => void;
  onSave: () => void;
  saveText?: string;
  disabled?: boolean;
};
const SaveAndCancelButtons: FunctionComponent<Props> = ({
  onCancel,
  onSave,
  saveText,
  disabled
}) => {
  return (
    <>
      <button
        className="bg-white focus:outline-none hover:bg-gray-200 text-gray-900 px-2 py-[#0.375rem] rounded disabled:cursor-not-allowed"
        onClick={onCancel}
      >
        Cancel
      </button>
      <button className="focus: outline-none text-white px-2 py-[#0.375rem] rounded disabled:cursor-not-allowed">
        {saveText != null ? saveText : 'Save'}
      </button>
    </>
  );
};

export default SaveAndCancelButtons;
