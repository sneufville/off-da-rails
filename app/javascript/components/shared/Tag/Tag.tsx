/**
 * @author  sai
 * created  2024-07-11
 * project  off_da_rails_coffee
 */

import React from 'react';
import { BiTag } from 'react-icons/bi';

type TagProps = {
  tagText: string;
};

const Tag: React.FC<TagProps> = ({ tagText }) => {
  return (
    <span className="px-2 py-1 rounded flex items-center gap-x-1 bg-blue-500 w-fit text-white">
      <BiTag />
      {tagText}
    </span>
  );
};

export default Tag;
