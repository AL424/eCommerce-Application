import { Address, BaseAddress } from '@commercetools/platform-sdk';
import React, { useState } from 'react';
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

export enum AddressTypeEnum {
  none = 'none',
  building = 'billing',
  shipping = 'shipping',
  buildingShipping = 'billing/shipping'
}

interface CustomAddress extends BaseAddress {
  addressType: AddressTypeEnum;
}

export const AddressInfo: React.FC<AddressInfoProps> = ({ address, type }) => {
  const [editmode, setEditmode] = useState(false);

  const {
    register,
    formState: { errors }
  } = useForm<CustomAddress>({
    mode: 'onChange'
  });

  let defaultType: string = AddressTypeEnum.none;
  if (type?.billing && type.shipping)
    defaultType = AddressTypeEnum.buildingShipping;
  else if (type?.billing) defaultType = AddressTypeEnum.building;
  else if (type?.shipping) defaultType = AddressTypeEnum.shipping;

  return (
    <>
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
          defaultValue={defaultType}
        />

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
      <div className="button-wrap">
        <div>
          <p>Set as default</p>
          <button type="button" className="button">
            billing
          </button>
          <button type="button" className="button">
            shipping
          </button>
        </div>
        <button type="button" className="button">
          delete
        </button>
        <button
          type="button"
          className={editmode ? 'button button_cancel' : 'button'}
          onClick={() => setEditmode((prev) => !prev)}
        >
          {editmode ? 'Cancel' : 'Edit'}
        </button>
        {editmode && (
          <button type="button" className="button button_save">
            Save
          </button>
        )}
      </div>
    </>
  );
};
