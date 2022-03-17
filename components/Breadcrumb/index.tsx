import React from 'react';
import Link from 'next/link';
type IProps = {
  productName: string;
  slug: string;
};
const Breadcrumb: FunctionComponent<IProps> = ({ productName, slug }) => {
  return (
    <ul className="flex text-gray-600 text-xs lg:text-sm">
      <li className="inline-flex items-center">
        <Link href="/dien-thoai">
          <a>Điện thoại</a>
        </Link>
        <svg
          className="h-5 w-auto text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path>
        </svg>
      </li>
      <li className="inline-flex items-center">
        <Link href={`/dien-thoai/${slug}`}>
          <a className="text-blue-500">{productName}</a>
        </Link>
      </li>
    </ul>
  );
};

export default Breadcrumb;
