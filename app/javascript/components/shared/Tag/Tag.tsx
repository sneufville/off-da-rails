/**
 * @author  sai
 * created  2024-07-11
 * project  off_da_rails_coffee
 */

import React from 'react';
import { BiTag } from 'react-icons/bi';

type TagProps = {
  iconElement?: React.ReactElement;
  tagText: string;
};

const Tag: React.FC<TagProps> = ({ iconElement, tagText }) => {
  return (
    <span className="px-2 py-1 rounded flex items-center font-medium gap-x-1 bg-blue-500 w-fit text-white">
      {iconElement ? iconElement : <BiTag />}
      {tagText}
    </span>
  );
};

export default Tag;
