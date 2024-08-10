/**
 * @author  sai
 * created  2024-07-13
 * project  off_da_rails_coffee
 */

import React from 'react';
import { Link } from '@inertiajs/react';

type PaginatorProps = {
  currentPage?: string;
  itemsPerPage: number;
  pageTarget: string;
  totalCount: number;
};
const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  itemsPerPage,
  pageTarget,
  totalCount,
}) => {
  const pageCount = Math.ceil(totalCount / itemsPerPage);
  // construct params for page
  return (
    <nav className="py-2 gap-2 flex items-center">
      {Array(pageCount)
        .fill(0)
        .map((_, index) => (
          <Link
            key={`${pageTarget}-${index + 1}`}
            className={[
              'p-2 rounded',
              currentPage === String(index + 1)
                ? 'font-bold bg-blue-500 text-white'
                : 'bg-slate-50',
            ].join(' ')}
            href={`/${pageTarget}?page=${index + 1}`}
          >
            <span>{index + 1}</span>
          </Link>
        ))}
    </nav>
  );
};

export default Paginator;
