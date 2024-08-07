/**
 * @author  sai
 * created  2024-08-07
 * project  off_da_rails_coffee
 */
import React from 'react';
import PageWrapper from '../../components/shared/PageWrapper/PageWrapper';

const CustomerOrderListing = (): React.ReactNode => {
  return (
    <PageWrapper>
      <div className="flex flex-col gap-y-2">
        <h1>My Orders</h1>
      </div>
    </PageWrapper>
  );
};

export default CustomerOrderListing;
