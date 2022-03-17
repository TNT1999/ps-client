import React from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../app/store';

interface IProps {
  title: string;
  data: Array<{ label: string; value: string }>;
  className?: string;
  value: Array<string>;
  handleAction: ActionCreatorWithPayload<string | string[], string>;
}
const FilterCard: FunctionComponent<IProps> = ({
  title,
  data,
  className,
  value,
  handleAction
}) => {
  const dispatch = useAppDispatch();
  // const [listChecked, setListChecked] = useState<string[]>(value)

  // useEffect(() => {
  //   batch(()=>{
  //     dispatch(handleAction(['8']))
  //     dispatch(handleAction(listChecked))
  //   })
  // }, [listChecked])

  // const handleSelect = (data: string): void => {
  //   listChecked.includes(data) ? setListChecked([...listChecked.filter(item => item != data)]) : setListChecked([...listChecked, data])
  // }

  return (
    <div className={`border rounded mb-4 last:mb-0 ${className || ''}`}>
      <span className="text-gray-700 text-sm font-medium py-2 px-3 border-b w-full block">
        {title}
      </span>
      <div className="mt-2 p-3 flex flex-wrap">
        {data.map((brand, index) => (
          <div className="flex-full lg:flex-1/2" key={index}>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox rounded border cursor-pointer"
                checked={value.includes(brand.value) ? true : false}
                onChange={() => dispatch(handleAction(brand.value))}
              />
              <span className="ml-2 text-gray-700 select-none text-sm whitespace-nowrap">
                {brand.label}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FilterCard;
