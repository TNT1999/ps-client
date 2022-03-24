import { ChevronDownIcon } from '@assets/icons';
import classNames from 'classnames';
import { FunctionComponent, useState } from 'react';
import { DeviceInfoType } from 'types';

type Props = {
  attrs: DeviceInfoType[];
};
const DeviceInfo: FunctionComponent<Props> = ({ attrs }) => {
  const [info, setInfo] = useState<DeviceInfoType[]>(
    attrs ? attrs.slice(0, 10) : []
  );
  const loadMoreInfo = () => {
    setInfo(info.concat(attrs.slice(10)));
  };
  return (
    <div className="w-[345px] border rounded-sm shadow">
      <div className="font-bold text-base text-center py-3 px-6">
        Thông số kỹ thuật
      </div>
      <ul className="m-0 list-none">
        {info.map((item, index) => (
          <li
            key={index}
            className={classNames('m-0 p-3 flex items-center border-b', {
              'bg-[#F2F2F2]': index % 2 == 0
            })}
          >
            <span className="text-sm max-w-[100px] min-w-[100px] pr-1 break-words mr-1">
              {item.name}
            </span>
            <span className="text-sm font-semibold">{item.value}</span>
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
