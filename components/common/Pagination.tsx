import { ChevronLeftIcon, ChevronRightIcon } from '@assets/icons';
import classNames from 'classnames';
import { FunctionComponent, useState } from 'react';
import { usePrevious, useUpdateEffect } from 'react-use';
type Props = {
  totalPage: number;
  currentPage: number;
  onChange: (page: number) => void;
};
const Pagination: FunctionComponent<Props> = ({
  currentPage,
  onChange,
  totalPage
}) => {
  const [pages, setPages] = useState(
    [...Array(totalPage < 5 ? totalPage : 5).keys()].map((i: number) => i + 1)
  );

  useUpdateEffect(() => {
    if (totalPage <= 5) return;
    if (currentPage >= 3 && currentPage <= totalPage - 2) {
      setPages([
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2
      ]);
    }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, totalPage]);

  if (totalPage <= 1) {
    return null;
  }

  return (
    <div className="bg-white px-4 py-3 flex items-end justify-between border-gray-200 sm:px-6 select-none">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-end">
        <div>
          <ul className="flex">
            <li className="mr-2">
              <a
                className={classNames(
                  'relative flex items-center justify-center rounded-full bg-white text-sm font-medium text-gray-500 hover:bg-gray-200 w-9 h-9',
                  {
                    'cursor-pointer': currentPage !== 1,
                    'opacity-25': currentPage === 1
                  }
                )}
                onClick={() => onChange(currentPage - 1)}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </li>
            {pages.map((page: number) => {
              return (
                <li className="mr-2" key={page}>
                  <a
                    className={classNames(
                      'flex items-center justify-center border-0 outline-none rounded-full hover:text-gray-800 hover:bg-[#c1e7ff] focus:shadow-none cursor-pointer w-9 h-9',
                      {
                        'bg-[#189eff] text-white cursor-default hover:bg-[#189eff]':
                          page === currentPage,
                        'bg-transparent text-gray-800': page !== currentPage
                      }
                    )}
                    onClick={() => onChange(page)}
                  >
                    {page}
                  </a>
                </li>
              );
            })}
            <li className="mr-2">
              <a
                className={classNames(
                  'relative flex items-center justify-center rounded-full bg-white text-sm font-medium text-gray-500 hover:bg-gray-200 w-9 h-9',
                  {
                    'cursor-pointer': currentPage !== totalPage,
                    'opacity-25 cursor-default': currentPage === totalPage
                  }
                )}
                onClick={() => onChange(currentPage + 1)}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
