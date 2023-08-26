import { Address, BaseAddress } from '@commercetools/platform-sdk';
import React from 'react';
import Select from '../../common/Select/Select';
import Input from '../../common/Input/Input';
import { useForm } from 'react-hook-form';
import citiesByCountry from '../../../utils/constants/countries.constants';
import { cityValidation } from '../../../utils/validation/cityValidation';
import { postalCodeValidation } from '../../../utils/validation/postalCodeValidation';
import { streetValidation } from '../../../utils/validation/streetValidation';
import { buildingValidation } from '../../../utils/validation/buildingValidation';

interface AddressInfoProps {
  address: Address;
  type?: AddressType;
  key?: string;
}

export interface AddressType {
  billing: boolean;
  shipping: boolean;
  defaultBilling: boolean;
  defaultShipping: boolean;
}

export const AddressInfo: React.FC<AddressInfoProps> = ({ address, type }) => {
  const {
    register,
    formState: { errors }
  } = useForm<BaseAddress>({
    mode: 'onChange'
  });

  const types: string[] = [];
  if (type?.billing) types.push('billing');
  if (type?.shipping) types.push('shipping');
  if (type?.defaultBilling) types.push('default billing');
  if (type?.defaultShipping) types.push('default shipping');

  return (
    <>
      <fieldset disabled>
        <p>Type: {types.join(', ') || 'none'}</p>
        <Select
          label="Country"
          options={citiesByCountry}
          registerProps={register('country')}
          defaultValue={address.country}
        />

        <Input
          label="City"
          placeholder="Enter your city"
          inputProps={register('city', cityValidation)}
          error={errors.city}
          defaultValue={address.city}
        />

        <Input
          label="Postal Code"
          placeholder="Postal Code"
          inputProps={register('postalCode', postalCodeValidation)}
          error={errors.postalCode}
          defaultValue={address.postalCode}
        />

        <Input
          label="Street"
          placeholder="Street name"
          inputProps={register('streetName', streetValidation)}
          error={errors.streetName}
          defaultValue={address.streetName}
        />

        <Input
          label="Building"
          placeholder="Building"
          inputProps={register('building', buildingValidation)}
          error={errors.building}
          defaultValue={address.building}
        />
      </fieldset>
    </>
  );
};
