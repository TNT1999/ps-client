import React, { useState, useCallback, useEffect, Fragment } from 'react';
import { KeyboardEvent } from 'react';
import debounce from 'lodash/debounce';
import axios from 'axios';
import { Transition } from '@headlessui/react';
import { formatMoney } from '../../utils';
import Link from 'next/link';
import router from 'next/router';
import { SearchIcon, SpinnerIcon } from '@assets/icons';

type PreviewProduct = {
  name: string;
  slug: string;
  thumbnail: string;
  price: number;
};
interface IPropsDropdown {
  products: Array<PreviewProduct>;
  showPreview: boolean;
}
interface IProps {
  className?: string;
}

const ProductItem: FunctionComponent<PreviewProduct> = ({
  name,
  slug,
  thumbnail,
  price
}) => {
  return (
    <Link href={`/dien-thoai/${slug}`}>
      <a className="block w-full h-auto first:rounded-t last:rounded-b hover:bg-gray-100 transition-colors ease-out duration-200">
        <div className="flex py-2">
          <div className="h-16 w-1/4 flex justify-start items-center">
            <img src={thumbnail} className="w-auto h-full" alt="" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium py-2 text-white">{name}</span>
            <span className="font-medium text-red-600 text-base">
              {formatMoney(price)}
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};
const DropdownPreview: FunctionComponent<IPropsDropdown> = ({
  products,
  showPreview
}) => {
  return (
    <Transition
      show={showPreview}
      as={Fragment}
      enter="transition ease-out duration-10"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-100"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div className={`absolute h-auto inset-x-0 top-10 shadow bg-white`}>
        {products.map((product) => (
          <ProductItem key={product.slug} {...product} />
        ))}
      </div>
    </Transition>
  );
};

const Search: FunctionComponent<IProps> = ({ className }) => {
  const [keyword, setKeyword] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [products, setProducts] = useState<Array<PreviewProduct>>([]);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const fetchPreview = useCallback(
    debounce((keyword: string) => {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/search/p/${keyword}`
        )
        .then((res) => {
          setProducts(res?.data?.previewProducts);
          setIsSearching(false);
          // setShowPreview(true)
        })
        .catch((e) => {
          // setProducts([])
          setIsSearching(false);
        });
    }, 500),
    []
  );

  const _handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowPreview(false);
      _handleSearch();
    }
  };

  const _handleSearch = () => {
    if (keyword) {
      // fetchPreview(keyword)
      router.push(`/dien-thoai/search?q=${keyword}`);
    } else {
      setProducts([]);
    }
  };

  useEffect(() => {
    if (keyword) {
      setIsSearching(true);
      fetchPreview(keyword);
    } else {
      setProducts([]);
    }
  }, [fetchPreview, keyword]);

  return (
    <div
      className={`relative shadow flex h-full md:h-5/6 w-auto ${
        className || ''
      }`}
    >
      <input
        onBlur={() => setShowPreview(false)}
        onFocus={() => setShowPreview(true)}
        onChange={(value) => setKeyword(value.currentTarget.value.trim())}
        type="text"
        placeholder="Nhập tên điện thoại..."
        className="w-full rounded p-2 outline-none text-xs sm:text-sm text-gray-700"
        onKeyDown={_handleKeyDown}
      />
      <button
        onClick={_handleSearch}
        className="flex items-center justify-center w-auto min-w-search-button h-auto text-blue p-1 md:p-2 bg-blue-500 rounded rounded-l-none focus:outline-none shadow"
      >
        {isSearching ? (
          <SpinnerIcon className="animate-spin fill-current text-white" />
        ) : (
          <SearchIcon className="text-white" />
        )}
      </button>

      {!!products.length && (
        <DropdownPreview products={products} showPreview={showPreview} />
      )}
    </div>
  );
};

export default Search;
