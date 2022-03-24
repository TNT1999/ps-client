import { formatMoney } from '@utils/index';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import { Variant } from 'types';
type Props = {
  option: Variant[];
};
const VariantBox: FunctionComponent<Props> = ({ option }) => {
  const [selectedOption, setSelectedOption] = useState(option[0]);
  const router = useRouter();
  const handleChangeVariant = (item: Variant) => {
    if (isEqual(item, selectedOption)) return;
    setSelectedOption(item);
    router.push(`/dien-thoai/${item.slug}`);
  };
  return (
    <div className="flex flex-wrap">
      {!isEmpty(option) &&
        option.map((item: Variant, index: number) => (
          <div
            onClick={() => handleChangeVariant(item)}
            key={index}
            className={classNames(
              'cursor-pointer shadow-md rounded mb-[10px] mr-[10px] flex flex-col text-center w-[calc((100%-10px*2)/3)] border py-[5px] px-[10px] last:mr-0',
              {
                'border-red-500': selectedOption.slug === item.slug
              }
            )}
          >
            <div className="font-base text-base mb-1">{item.name}</div>
            <div className="text-red-600 font-medium text-sm">
              {formatMoney(item.price)}
            </div>
          </div>
        ))}
    </div>
  );
};

export default VariantBox;
