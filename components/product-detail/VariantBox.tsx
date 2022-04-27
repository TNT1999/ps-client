import { formatMoney } from '@utils/index';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Variant } from 'types';
import { SelectIndicatorIcon } from '@assets/icons';
type Props = {
  option: Variant[];
};
const VariantBox: FunctionComponent<Props> = ({ option }) => {
  const router = useRouter();
  const [selectedOptionSlug, setSelectedOptionSlug] = useState(
    router.query.slug
  );
  const handleChangeVariant = (slug: string) => {
    if (slug === selectedOptionSlug) return;
    setSelectedOptionSlug(slug);
    router.push(`/dien-thoai/${slug}`);
  };
  return (
    <div className="flex flex-wrap">
      {!isEmpty(option) &&
        option.map((item: Variant, index: number) => (
          <div
            onClick={() => handleChangeVariant(item.slug)}
            key={index}
            className={classNames(
              'cursor-pointer rounded mb-[10px] mr-[10px] flex flex-col text-center w-[calc((100%-10px*3)/3)] border py-[5px] px-[10px] last:mr-0 relative',
              {
                'border-[#0d5cb6]': selectedOptionSlug === item.slug
              }
            )}
          >
            <div className="font-medium text-base mb-1">{item.name}</div>
            <div className="text-red-600 font-medium text-sm">
              {formatMoney(item.price)}
            </div>
            {selectedOptionSlug === item.slug && (
              <SelectIndicatorIcon className="text-[#0D5CB6] absolute -top-px -right-px" />
            )}
          </div>
        ))}
    </div>
  );
};

export default VariantBox;
