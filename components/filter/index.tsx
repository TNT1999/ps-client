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
import CollapseFilter from '@components/common/CollapseFilter';
import pickBy from 'lodash/pickBy';
import size from 'lodash/size';
import isEmpty from 'lodash/isEmpty';
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
  // {
  //   label: 'ASUS',
  //   value: 'asus'
  // },
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
    value: 'gt8'
  }
];
const Price = [
  {
    label: 'Dưới 5 triệu',
    value: 'lt5tr'
  },
  {
    label: '5 - 10 triệu',
    value: 'gte5lt10tr'
  },
  {
    label: '10 - 15 triệu',
    value: 'gte10lt15tr'
  },
  {
    label: '15 - 20 triệu',
    value: 'gte15lt20tr'
  },
  {
    label: 'Trên 20 triệu',
    value: 'gt20tr'
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
    value: 'gt256'
  }
];
const Display = [
  {
    label: '< 5 inches',
    value: 'lt5'
  },
  {
    label: '5 - 5.5 inches',
    value: 'gte5lt5.5'
  },
  {
    label: '5.5 - 6 inches',
    value: 'gte5.5lt6'
  },
  {
    label: '> 6 inches',
    value: 'gt6'
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
    const removedEmptyFilter = pickBy(filter, size);
    if (isEmpty(removedEmptyFilter)) {
      router.replace('/dien-thoai', undefined, { shallow: true });
    }
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
      <CollapseFilter
        title={'Thương hiệu'}
        data={Brand}
        value={filter.brand}
        handleAction={setFilterBrand}
      />
      <CollapseFilter
        title={'Ram'}
        data={RAM}
        value={filter.ram}
        handleAction={setFilterRam}
      />
      <CollapseFilter
        title={'Rom'}
        data={Storage}
        value={filter.storage}
        handleAction={setFilterStorage}
      />
      <CollapseFilter
        title={'Giá'}
        data={Price}
        value={filter.price}
        handleAction={setFilterPrice}
      />
      <CollapseFilter
        data={Display}
        title={'Màn hình'}
        value={filter.display}
        handleAction={setFilterDisplay}
      />
    </div>
  );
};
export default Filter;
