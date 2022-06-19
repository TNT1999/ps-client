import classNames from 'classnames';
import { FunctionComponent, useState } from 'react';
import Tippy from '@tippyjs/react';
import Tooltip from '@components/common/Tooltip';
import { CheckCircleIcon, Edit2Icon } from '@assets/icons';
import { AddressType, AddressWithIdType } from '@types';
import AddressModal, {
  MODE
} from '@components/common/checkout/cart/AddressModal';

type Props = {
  isSelected: boolean;
  handleSelect: () => void;
  address: AddressWithIdType;
  handleHiddenDrawer: (hidden: boolean) => void;
};
const SelectAddressItem: FunctionComponent<Props> = ({
  isSelected,
  handleSelect,
  address,
  handleHiddenDrawer
}) => {
  const [visibleEditAddressModal, setEditVisibleAddressModal] = useState(false);

  return (
    <div
      className={classNames('flex flex-col p-3 pl-2 rounded-md border mb-3', {
        'border-[#dadada]': !isSelected,
        'border-blue-500': isSelected
      })}
    >
      <div className="flex">
        <div className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={classNames('w-6 h-6 cursor-pointer', {
              'text-gray-300': !isSelected,
              'text-blue-600': isSelected
            })}
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={handleSelect}
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="text-13">
          <div className="flex items-center justify-between mb-1 text-black">
            <div className="uppercase mb-3 flex">
              <p>{address.name}</p>
              <i className="block w-px mx-3 h-full bg-[#ebebf0]" />
              <p>{address.phone}</p>
            </div>
            {address.isDefault && (
              <span className="flex items-center self-start text-green-500 text-[12px] normal-case">
                <CheckCircleIcon className="w-3.5 h-3.5 mr-1" />
                <span>Mặc định</span>
              </span>
            )}
          </div>
          <div>
            {`${address.address}, ${address.ward}, ${address.district}, ${address.province}`}
          </div>
        </div>
      </div>
      <div className="self-end mt-2">
        <Tippy
          arrow={true}
          content={<Tooltip text={'Chỉnh sửa'} />}
          delay={100}
        >
          <span>
            <Edit2Icon
              className="w-4 h-4 text-gray-500 cursor-pointer"
              onClick={() => {
                handleHiddenDrawer(true);
                setEditVisibleAddressModal(true);
              }}
            />
          </span>
        </Tippy>
        {visibleEditAddressModal && (
          <AddressModal
            address={address}
            onClose={() => {
              setEditVisibleAddressModal(false);
              handleHiddenDrawer(false);
            }}
            mode={MODE.EDIT}
          />
        )}
      </div>
    </div>
  );
};

export default SelectAddressItem;
