import {
  Address,
  BaseAddress,
  Customer,
  MyCustomerRemoveAddressAction,
  MyCustomerUpdate
} from '@commercetools/platform-sdk';
import React, { useState, useEffect } from 'react';
import Select from '../../common/Select/Select';
import Input from '../../common/Input/Input';
import { Button } from '../../buttons/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import citiesByCountry from '../../../utils/constants/countries.constants';
import { cityValidation } from '../../../utils/validation/cityValidation';
import { postalCodeValidation } from '../../../utils/validation/postalCodeValidation';
import { streetValidation } from '../../../utils/validation/streetValidation';
import { buildingValidation } from '../../../utils/validation/buildingValidation';
import CheckboxInput from '../../common/CheckboxInput/CheckboxInput';
import { customerUpdate } from '../../../services/eCommerceService/Customer';
import { toast } from 'react-toastify';

interface AddressInfoProps {
  address: Address;
  type?: AddressType;
  key?: string;
  customer: Customer;
  setCustomer: React.Dispatch<React.SetStateAction<Customer>>;
}

export interface AddressType {
  billing: boolean;
  shipping: boolean;
  defaultBilling: boolean;
  defaultShipping: boolean;
}

export enum AddressTypeEnum {
  none = 'none',
  building = 'billing',
  shipping = 'shipping',
  buildingShipping = 'billing/shipping'
}

interface CustomAddress extends BaseAddress {
  addressType: string;
}

export const AddressInfo: React.FC<AddressInfoProps> = ({
  address,
  type,
  customer,
  setCustomer
}) => {
  const [editmode, setEditmode] = useState(false);
  const [defaultShippingAddress, setDefaultShippingAddress] = useState(
    type?.defaultShipping
  );
  const [defaultBillingAddress, setDefaultBillingAddress] = useState(
    type?.defaultBilling
  );

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<CustomAddress>({
    mode: 'onChange'
  });

  useEffect(() => {
    let defaultType: string = AddressTypeEnum.none;
    if (type?.billing && type.shipping)
      defaultType = AddressTypeEnum.buildingShipping;
    else if (type?.billing) defaultType = AddressTypeEnum.building;
    else if (type?.shipping) defaultType = AddressTypeEnum.shipping;

    setValue('addressType', defaultType);
    setValue('country', address.country);
    setValue('city', address.city);
    setValue('postalCode', address.postalCode);
    setValue('streetName', address.streetName);
    setValue('building', address.building);
  }, [address, type, setValue]);

  // функции обработчики
  const onCancel = () => {
    setEditmode((prev) => !prev);
  };
  const onSave: SubmitHandler<CustomAddress> = (data) => {
    console.log(data);
  };
  const onDelete = async () => {
    const action: MyCustomerRemoveAddressAction = {
      action: 'removeAddress',
      addressId: address.id
    };
    const data: MyCustomerUpdate = {
      version: customer.version,
      actions: [action]
    };
    const response = await customerUpdate(data);
    if (typeof response === 'string') {
      toast.error(response);
    } else {
      toast.success('Address deleted successfully!');
      setCustomer(response);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <fieldset disabled={!editmode}>
        {type?.defaultBilling && (
          <legend>
            Default Billing Address
            {type?.defaultShipping && (
              <>
                <br />
                Default Shipping Address
              </>
            )}
          </legend>
        )}
        {!type?.defaultBilling && type?.defaultShipping && (
          <legend>Default Shipping Address</legend>
        )}
        <Select
          label="Address Type"
          options={Object.values(AddressTypeEnum)}
          registerProps={register('addressType')}
          // defaultValue={defaultType}
        />

        <Select
          label="Country"
          options={citiesByCountry}
          registerProps={register('country')}
          // defaultValue={address.country}
        />

        <Input
          label="City"
          placeholder="Enter your city"
          inputProps={register('city', cityValidation)}
          error={errors.city}
        />

        <Input
          label="Postal Code"
          placeholder="Postal Code"
          inputProps={register('postalCode', postalCodeValidation)}
          error={errors.postalCode}
        />

        <Input
          label="Street"
          placeholder="Street name"
          inputProps={register('streetName', streetValidation)}
          error={errors.streetName}
        />

        <Input
          label="Building"
          placeholder="Building"
          inputProps={register('building', buildingValidation)}
          error={errors.building}
        />

        {editmode && (
          <CheckboxInput
            label="Set as default shipping address"
            checked={defaultShippingAddress || false}
            onChange={() => {
              setDefaultShippingAddress(!defaultShippingAddress);
            }}
          />
        )}

        {editmode && (
          <CheckboxInput
            label="Set as default billing address"
            checked={defaultBillingAddress || false}
            onChange={() => {
              setDefaultBillingAddress(!defaultBillingAddress);
            }}
          />
        )}
      </fieldset>

      <div className="button-wrap">
        {!editmode && <Button title="delete" onClick={onDelete} />}
        {!editmode && (
          <Button title="edit" onClick={() => setEditmode((prev) => !prev)} />
        )}
        {editmode && (
          <Button
            title="cancel"
            classList={['button_cancel']}
            onClick={onCancel}
          />
        )}
        {editmode && (
          <Button type="submit" title="save" classList={['button_save']} />
        )}
      </div>
    </form>
  );
};
