import { Customer } from '@commercetools/platform-sdk';
import React from 'react';
import { AddressInfo, AddressType } from '../AddressInfo/AddressInfo';

interface AddressesInfoProps {
  customer: Customer;
}

export const AddressesInfo: React.FC<AddressesInfoProps> = ({ customer }) => {
  const {
    addresses,
    billingAddressIds,
    shippingAddressIds,
    defaultBillingAddressId,
    defaultShippingAddressId
  } = customer;

  console.log(
    billingAddressIds,
    shippingAddressIds,
    defaultBillingAddressId,
    defaultShippingAddressId
  );

  return (
    <fieldset>
      <legend>Addresses</legend>
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
          return <AddressInfo address={address} type={type} key={address.id} />;
        })}
    </fieldset>
  );
};
