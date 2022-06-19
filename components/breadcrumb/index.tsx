import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from '@assets/icons';
type BreadcrumbType = {
  value: string;
  href: string;
  className?: string;
};
type IProps = {
  breadcrumbs: BreadcrumbType[];
};
const Breadcrumb: FunctionComponent<IProps> = React.memo(({ breadcrumbs }) => {
  return (
    <ul className="flex text-gray-600 text-xs lg:text-sm pb-4">
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <li className="inline-flex items-center m-0 capitalize" key={index}>
            <Link href={breadcrumb.href}>
              <a>{breadcrumb.value}</a>
            </Link>
            {index !== breadcrumbs.length - 1 && (
              <ChevronRightIcon className="h-4 w-4 text-gray-600" />
            )}
          </li>
        );
      })}
    </ul>
  );
});

Breadcrumb.displayName = '_b';
export default Breadcrumb;
