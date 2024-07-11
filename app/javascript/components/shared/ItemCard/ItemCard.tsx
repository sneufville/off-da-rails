/**
 * @author  sai
 * created  2024-07-11
 * project  off_da_rails_coffee
 */

import React from 'react';
import { Link } from '@inertiajs/react';
import type { Item } from '../../../@types/offDaRails';

type ItemCardProps = {
  item: Item;
  linkBase?: string;
};

const ItemCard: React.FC<ItemCardProps> = ({ item, linkBase }) => {
  return <div></div>;
};

export default ItemCard;
