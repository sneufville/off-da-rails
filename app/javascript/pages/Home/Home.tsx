/**
 * @author  sai
 * created  2024-07-10
 * project  off_da_rails_coffee
 */

import * as React from 'react';
import type { FC as ReactFC } from 'react';
import { Link } from '@inertiajs/react';
import type { Item } from '../../@types/offDaRails';
import PageWrapper from '../../components/shared/PageWrapper/PageWrapper';

type HomeProps = {
  name: string;
  items: Array<Item>;
};

const Home: ReactFC<HomeProps> = ({ name, items }) => {
  return (
    <PageWrapper>
      <div className="flex flex-col gap-y-4">
        <h1 className="text-4xl">Home Component</h1>
        <p className="text-xl">{name}</p>
        <div>
          {items.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {items.map((item) => (
                <div
                  className="bg-slate-50 rounded p-2 border-gray-200 flex flex-col gap-y-2"
                  key={`item-${item.id}`}
                >
                  <h2 className="font-bold text-xl">
                    <Link href={`items/${item.id}`}>{item.item_name}</Link>
                  </h2>
                  <p className="text-lg leading-8 italic">
                    {item.item_description}
                  </p>
                  <p className="text-md">${item.item_cost / 100}</p>
                </div>
              ))}
            </div>
          ) : (
            <div>No Items Available</div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
