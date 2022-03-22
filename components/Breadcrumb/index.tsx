import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from '@assets/icons';
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
        <ChevronRightIcon className="h-4 w-4 text-gray-600" />
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
