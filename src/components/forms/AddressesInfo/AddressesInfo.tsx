import { Customer } from '@commercetools/platform-sdk';
import React from 'react';
import { AddressInfo, AddressType } from '../AddressInfo/AddressInfo';

interface AddressesInfoProps {
  customer: Customer;
  setCustomer: React.Dispatch<React.SetStateAction<Customer>>;
}

export const AddressesInfo: React.FC<AddressesInfoProps> = ({
  customer,
  setCustomer
}) => {
  const {
    addresses,
    billingAddressIds,
    shippingAddressIds,
    defaultBillingAddressId,
    defaultShippingAddressId
  } = customer;

  return (
    <>
      <h2 className="profile__sub-title">Addresses</h2>
      {addresses &&
        addresses.map((address) => {
          const type: AddressType = {
            billing: false,
            shipping: false,
            defaultBilling: false,
            defaultShipping: false
          };

          const id = address.id;

          if (id && billingAddressIds?.includes(id)) type.billing = true;
          if (id && shippingAddressIds?.includes(id)) type.shipping = true;
          if (id && defaultBillingAddressId === id) type.defaultBilling = true;
          if (id && defaultShippingAddressId === id)
            type.defaultShipping = true;

          return (
            <AddressInfo
              address={address}
              type={type}
              key={address.id}
              customer={customer}
              setCustomer={setCustomer}
            />
          );
        })}
    </>
  );
};
