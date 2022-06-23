import { ChevronDownIcon } from '@assets/icons';
import classNames from 'classnames';
import { FunctionComponent, useState } from 'react';
import { DeviceInfoType } from '@types';

type Props = {
  attrs: DeviceInfoType[];
};
const DeviceInfo: FunctionComponent<Props> = ({ attrs }) => {
  const [info, setInfo] = useState<DeviceInfoType[]>(
    attrs ? attrs.slice(0, 8) : []
  );
  const loadMoreInfo = () => {
    setInfo(info.concat(attrs.slice(8)));
  };
  return (
    <div className="rounded border-px border-[#eeeeee]">
      <div className="text-center py-3 px-6 text-xl font-normal">
        Thông số kỹ thuật
      </div>
      <ul className="m-0 list-none rounded">
        {info.map((item, index) => (
          <li
            key={index}
            className={classNames(
              'm-0 p-3 flex items-center border-b border-[#eeeeee]',
              {
                'bg-white': index % 2 == 0,
                'bg-[#fafafa]': index % 2 != 0
              }
            )}
          >
            <span className="text-13 max-w-[100px] min-w-[100px] pr-1 break-words mr-1">
              {item.name}
            </span>
            <span className="text-13">{item.value}</span>
          </li>
        ))}
        {info.length < attrs.length ? (
          <button
            onClick={loadMoreInfo}
            className="flex w-full justify-center items-center text-sm text-center py-2 px-6 outline-none"
          >
            <span>Xem thêm</span>
            <ChevronDownIcon className="ml-2" />
          </button>
        ) : null}
      </ul>
    </div>
  );
};

export default DeviceInfo;
