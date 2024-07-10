/**
 * @author  sai
 * created  2024-07-10
 * project  off_da_rails_coffee
 */

import React from 'react';
import type { FC as ReactFC } from 'react';
import { FaTag } from 'react-icons/fa';

type DetailProps = {
  error?: string;
  item?: any;
  item_category?: any;
};

const Detail: ReactFC<DetailProps> = ({ error, item, item_category }) => {
  return (
    <div>
      {error ? (
        <div className="bg-red-50 p-2 flex flex-col gap-y-2">
          <h1 className="text-2xl text-red-600">Uh oh!</h1>
          <p>{error}</p>
        </div>
      ) : undefined}
      {item ? (
        <div className="p-2 flex flex-col gap-y-4">
          <h1 className="text-4xl">{item.item_name}</h1>
          <p>{item.item_description}</p>
          <p>${item.item_cost / 100}</p>
          <div className="flex items-center">
            {item_category ? (
              <span className="px-2 py-1 text-white font-bold uppercase bg-blue-500 rounded w-fit flex items-center gap-x-1">
                <FaTag />
                {item_category.category_name}
              </span>
            ) : undefined}
            <div className="flex flex-1"></div>
          </div>
        </div>
      ) : undefined}
    </div>
  );
};

export default Detail;
