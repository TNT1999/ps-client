import React, { FunctionComponent, useEffect } from 'react';
import FilterCard from './FilterCard';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@app/store';
import {
  setFilterBrand,
  setFilterDisplay,
  setFilterPrice,
  setFilterRam,
  setFilterStorage
} from '@app/slice/homeSlice';
import { customQueryString } from '@utils/index';
import classnames from 'classnames';
const Brand = [
  {
    label: 'Apple',
    value: 'apple'
  },
  {
    label: 'Vsmart',
    value: 'vsmart'
  },
  {
    label: 'Samsung',
    value: 'samsung'
  },
  {
    label: 'Xiaomi',
    value: 'xiaomi'
  },
  {
    label: 'Nokia',
    value: 'nokia'
  },
  {
    label: 'Oppo',
    value: 'oppo'
  },
  {
    label: 'Vivo',
    value: 'vivo'
  },
  {
    label: 'ASUS',
    value: 'asus'
  },
  {
    label: 'Realme',
    value: 'realme'
  }
];
const RAM = [
  {
    label: '1 GB',
    value: '1'
  },
  {
    label: '2 GB',
    value: '2'
  },
  {
    label: '3 GB',
    value: '3'
  },
  {
    label: '4 GB',
    value: '4'
  },
  {
    label: '6 GB',
    value: '6'
  },
  {
    label: '8 GB',
    value: '8'
  },
  {
    label: 'Trên 8 GB',
    value: '>8'
  }
];
const Price = [
  {
    label: 'Dưới 5 triệu',
    value: '<5tr'
  },
  {
    label: '5 - 10 triệu',
    value: '5-10tr'
  },
  {
    label: '10 - 15 triệu',
    value: '10-15tr'
  },
  {
    label: '15 - 20 triệu',
    value: '15-20tr'
  },
  {
    label: 'Trên 20 triệu',
    value: '>20tr'
  }
];
const Storage = [
  {
    label: '4 GB',
    value: '4'
  },
  {
    label: '8 GB',
    value: '8'
  },
  {
    label: '16 GB',
    value: '16'
  },
  {
    label: '32 GB',
    value: '32'
  },
  {
    label: '64 GB',
    value: '64'
  },
  {
    label: '128 GB',
    value: '128'
  },
  {
    label: '256 GB',
    value: '256'
  },
  {
    label: 'Trên 256 GB',
    value: '>256'
  }
];
const Display = [
  {
    label: '< 5 inches',
    value: '<5'
  },
  {
    label: '5 - 5.5 inches',
    value: '5-5.5'
  },
  {
    label: '5.5 - 6 inches',
    value: '5.5-6'
  },
  {
    label: '> 6 inches',
    value: '>6'
  }
];
type IProps = {
  className?: string;
};

const Filter: FunctionComponent<IProps> = ({ className }) => {
  const router = useRouter();
  const filter = useSelector((state: RootState) => state.home.filter);
  // useEffect(() => {
  //   console.log(router);
  // }, [router.query]);

  useEffect(() => {
    const query = customQueryString.stringify(filter);
    if (query) {
      if (JSON.stringify(router.query) !== '{}') {
        router.replace(`/dien-thoai?${query}`, undefined, { shallow: true });
      }
      router.push(`/dien-thoai?${query}`, undefined, { shallow: true });
    }
  }, [filter]);

  return (
    <div className={classnames(className)}>
      <FilterCard
        data={Brand}
        title={'Hãng sản xuất'}
        value={filter.brand}
        handleAction={setFilterBrand}
      />
      <FilterCard
        data={RAM}
        title={'Bộ nhớ RAM'}
        value={filter.ram}
        handleAction={setFilterRam}
      />
      <FilterCard
        data={Storage}
        title={'Bộ nhớ trong'}
        value={filter.storage}
        handleAction={setFilterStorage}
      />
      <FilterCard
        data={Price}
        title={'Giá'}
        value={filter.price}
        handleAction={setFilterPrice}
      />
      <FilterCard
        data={Display}
        title={'Màn hình'}
        value={filter.display}
        handleAction={setFilterDisplay}
      />
    </div>
  );
};
export default Filter;
