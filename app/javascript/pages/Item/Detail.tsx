/**
 * @author  sai
 * created  2024-07-10
 * project  off_da_rails_coffee
 */

import React from 'react';
import type { FC as ReactFC } from 'react';
import { Link } from '@inertiajs/react';
import { FaTag } from 'react-icons/fa';
import type { Item, ItemCategory, ItemImage } from '../../@types/offDaRails';
import PageWrapper from '../../components/shared/PageWrapper/PageWrapper';

type DetailProps = {
  error?: string;
  item?: Item;
  item_category?: ItemCategory;
  item_image?: ItemImage;
  related_items?: Array<Item>;
};

const Detail: ReactFC<DetailProps> = ({
  error,
  item,
  item_category,
  item_image,
  related_items,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    document.addEventListener('inertia:start', (e) => {
      console.log('start event listener');
      setLoading(true);
    });
    document.addEventListener('inertia:finish', (e) => {
      console.log('finish event listener');
      setLoading(false);
    });
    return () => {
      document.removeEventListener('inertia:start', (e) => {
        console.log('removing listener for inertia start');
      });
      document.removeEventListener('inertia:finish', (e) => {});
    };
  }, []);
  return (
    <PageWrapper>
      <div className="flex flex-col">
        {/*{loading ? (*/}
        {/*  <div className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">*/}
        {/*    <div className="relative p-4 w-full max-w-2xl max-h-full">*/}
        {/*      <div className="relative bg-white rounded shadow">*/}
        {/*        <div className="p-4 md:p-5 space-y-4">*/}
        {/*          <Lottie animationData={coffeeLoader} />*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*) : undefined}*/}
        {error ? (
          <div className="bg-red-50 p-2 flex flex-col gap-y-2">
            <h1 className="text-2xl text-red-600">Uh oh!</h1>
            <p>{error}</p>
          </div>
        ) : undefined}
        {item ? (
          <div className="p-2 flex flex-col gap-y-4">
            {item_image && item_image.filename ? (
              <img
                alt={`image for ${item.item_name}`}
                className="h-60 object-cover w-full"
                src={item_image.filename}
              />
            ) : null}
            <h1 className="text-4xl">{item.item_name}</h1>
            <p>{item.item_description}</p>
            <p>${Number(item.item_cost).toFixed(2)}</p>
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
        <section className="flex flex-col gap-y-4">
          <h2 className="text-2xl">Related Items</h2>
          <p>Here are some items you might be interested in</p>
          {related_items?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {related_items.map((item) => (
                <div
                  key={`related-item-${item.id}`}
                  className="rounded p-2 bg-slate-50"
                >
                  <h2 className="text-lg font-bold hover:underline">
                    <Link
                      className="hover:underline"
                      href={`/items/${item.id}`}
                    >
                      {item.item_name}
                    </Link>
                  </h2>
                  <p>${Number(item.item_cost).toFixed(2)}</p>
                </div>
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </section>
      </div>
    </PageWrapper>
  );
};

export default Detail;
