import { FunctionComponent, useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useAppDispatch } from '@app/store';
import { ChevronDownIcon, ChevronUpIcon } from '@assets/icons';
type DataFilter = {
  label: string;
  value: string;
};
type Props = {
  title: string;
  data: DataFilter[];
  value: string[];
  handleAction: ActionCreatorWithPayload<string | string[], string>;
};
const CollapseFilter: FunctionComponent<Props> = ({
  title,
  data,
  value,
  handleAction
}) => {
  const [open, setOpen] = useState(true);
  const dispatch = useAppDispatch();
  return (
    <div className="border-b-px border-[#f7f7f7] pl-4 pr-2 pb-3">
      <h3>
        <button
          type="button"
          onClick={(e) => {
            setOpen(!open);
          }}
          className="py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500 text-sm"
          aria-controls="filter-section-mobile-0"
          aria-expanded="false"
        >
          <span className="font-medium text-gray-900 uppercase leading-5 text-13">
            {' '}
            {title}{' '}
          </span>
          <span className="ml-6 flex items-center">
            {!open ? (
              <ChevronDownIcon className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronUpIcon className="h-4 w-4 text-gray-400" />
            )}
          </span>
        </button>
      </h3>
      <motion.div
        className={classNames({
          'pointer-events-none': !open
        })}
        variants={{
          expanded: {
            opacity: 1,
            height: 'auto'
          },
          collapsed: {
            opacity: 0,
            height: 0
          }
        }}
        initial={false}
        animate={!open ? 'collapsed' : 'expanded'}
        transition={{ duration: 0.2 }}
      >
        <div className="space-y-2">
          {data.map((brand, index) => (
            <div className="flex items-center select-none" key={index}>
              <input
                id={`${title}-${brand.value}`}
                name="color[]"
                value="white"
                type="checkbox"
                className="h-3.25 w-3.25 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                checked={value.includes(brand.value) ? true : false}
                onChange={() => dispatch(handleAction(brand.value))}
              />
              <label
                htmlFor={`${title}-${brand.value}`}
                className="ml-3 min-w-0 flex-1 text-gray-600 text-13"
              >
                {' '}
                {brand.label}{' '}
              </label>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CollapseFilter;
