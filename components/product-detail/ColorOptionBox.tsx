import { formatMoney } from '@utils/index';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { ColorOption } from 'types';

type Props = {
  colorOptions: ColorOption[];
  selectedColorOption: ColorOption;
  changeColorOption: Dispatch<SetStateAction<ColorOption>>;
};
const ColorOptionBox: FunctionComponent<Props> = ({
  colorOptions,
  selectedColorOption,
  changeColorOption
}) => {
  const handleChangeColorOption = (item: ColorOption) => {
    changeColorOption(item);
  };
  return (
    <div className="flex flex-wrap">
      {!isEmpty(colorOptions) &&
        colorOptions.map((item: ColorOption, index: number) => (
          <div
            onClick={() => handleChangeColorOption(item)}
            key={index}
            className={classNames(
              'cursor-pointer shadow-md rounded mb-[10px] mr-[10px] flex flex-col text-center w-[calc((100%-10px*2)/3)] border py-[5px] px-[10px] last:mr-0',
              {
                'border-red-500': selectedColorOption.id === item.id,
                'pointer-events-none opacity-50': Number(item.amount) <= 0
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

export default ColorOptionBox;
