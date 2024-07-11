/**
 * @author  sai
 * created  2024-07-11
 * project  off_da_rails_coffee
 */

import React from 'react';
import { TbAlertOctagonFilled, TbInfoOctagonFilled } from 'react-icons/tb';
import type { InfoCardType } from '../../../@types/offDaRails';

type InfoCardProps = {
  cardType: InfoCardType;
  title: string;
  content?: string;
  actionItems?: React.ReactElement;
};

const IconElement: Record<InfoCardType, React.ReactElement> = {
  error: <TbAlertOctagonFilled size={64} />,
  info: <TbInfoOctagonFilled size={64} />,
};

const InfoCard: React.FC<InfoCardProps> = ({
  cardType,
  title,
  content,
  actionItems,
}) => {
  return (
    <div className="flex flex-col gap-y-4 p-4 rounded bg-gray-50 items-center">
      {IconElement[cardType]}
      <h2 className="text-2xl">{title}</h2>
      {content ? (
        <p className="text-lg leading-4 font-medium">{content}</p>
      ) : undefined}
      {actionItems ? (
        <div className="flex items-center gap-x-2 flex-wrap">{actionItems}</div>
      ) : undefined}
    </div>
  );
};

export default InfoCard;
