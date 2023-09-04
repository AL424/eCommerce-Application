import {
  Address,
  BaseAddress,
  Customer,
  MyCustomerAddBillingAddressIdAction,
  MyCustomerAddShippingAddressIdAction,
  MyCustomerChangeAddressAction,
  MyCustomerRemoveAddressAction,
  MyCustomerRemoveBillingAddressIdAction,
  MyCustomerRemoveShippingAddressIdAction,
  MyCustomerSetDefaultBillingAddressAction,
  MyCustomerSetDefaultShippingAddressAction,
  MyCustomerUpdate,
  MyCustomerUpdateAction
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
  const [billingAddress, setBillingAddress] = useState(type?.billing);
  const [shippingAddress, setShippingAddress] = useState(type?.shipping);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<BaseAddress>({
    mode: 'onChange'
  });

  useEffect(() => {
    setDefaultShippingAddress(type?.defaultShipping);
    setDefaultBillingAddress(type?.defaultBilling);
    setBillingAddress(type?.billing);
    setShippingAddress(type?.shipping);

    setValue('country', address.country);
    setValue('city', address.city);
    setValue('postalCode', address.postalCode);
    setValue('streetName', address.streetName);
    setValue('building', address.building);
  }, [address, type, setValue, customer]);

  // функции обработчики
  const onCancel = () => {
    reset();

    setDefaultShippingAddress(type?.defaultShipping);
    setDefaultBillingAddress(type?.defaultBilling);

    setBillingAddress(type?.billing);
    setShippingAddress(type?.shipping);

    setValue('country', address.country);
    setValue('city', address.city);
    setValue('postalCode', address.postalCode);
    setValue('streetName', address.streetName);
    setValue('building', address.building);

    setEditmode(false);
  };

  const onSave: SubmitHandler<BaseAddress> = async (data) => {
    const actions: MyCustomerUpdateAction[] = [];

    if (type?.billing !== billingAddress) {
      if (billingAddress) {
        const change: MyCustomerAddBillingAddressIdAction = {
          action: 'addBillingAddressId',
          addressId: address.id
        };
        actions.push(change);
      } else {
        const change: MyCustomerRemoveBillingAddressIdAction = {
          action: 'removeBillingAddressId',
          addressId: address.id
        };
        actions.push(change);
      }
    }
    if (type?.shipping !== shippingAddress) {
      if (shippingAddress) {
        const change: MyCustomerAddShippingAddressIdAction = {
          action: 'addShippingAddressId',
          addressId: address.id
        };
        actions.push(change);
      } else {
        const change: MyCustomerRemoveShippingAddressIdAction = {
          action: 'removeShippingAddressId',
          addressId: address.id
        };
        actions.push(change);
      }
    }

    if (!type?.defaultBilling && defaultBillingAddress) {
      const change: MyCustomerSetDefaultBillingAddressAction = {
        action: 'setDefaultBillingAddress',
        addressId: address.id
      };
      actions.push(change);
    }
    if (!type?.defaultShipping && defaultShippingAddress) {
      const change: MyCustomerSetDefaultShippingAddressAction = {
        action: 'setDefaultShippingAddress',
        addressId: address.id
      };
      actions.push(change);
    }

    const isAddressChange: boolean =
      data.country !== address.country ||
      data.city !== address.city ||
      data.postalCode !== address.postalCode ||
      data.streetName !== address.streetName ||
      data.building !== address.building;

    if (isAddressChange) {
      const change: MyCustomerChangeAddressAction = {
        action: 'changeAddress',
        addressId: address.id,
        address: address
      };
      actions.push(change);
    }

    if (actions.length === 0) {
      toast.info('Address has not changed.');
      setEditmode(false);
      return;
    }

    const dataChange: MyCustomerUpdate = {
      version: customer.version,
      actions: actions
    };

    const response = await customerUpdate(dataChange);
    if (typeof response === 'string') {
      toast.error(response);
      onCancel();
    } else {
      setCustomer(response);
      toast.success('Address successfully changed!');
      setEditmode(false);
    }
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
      toast.success('Address successfully deleted!');
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
        <p className="address-type-label">Address type</p>
        {!editmode && billingAddress && (
          <p className="address-type">Billing address</p>
        )}
        {!editmode && shippingAddress && (
          <p className="address-type">Shipping address</p>
        )}
        {!editmode && !billingAddress && !shippingAddress && (
          <p className="address-type address-type_none">none</p>
        )}

        {editmode && (
          <CheckboxInput
            label="billing address"
            checked={billingAddress || false}
            onChange={() => {
              setBillingAddress(!billingAddress);
            }}
          />
        )}

        {editmode && (
          <CheckboxInput
            label="shipping address"
            checked={shippingAddress || false}
            onChange={() => {
              setShippingAddress(!shippingAddress);
            }}
          />
        )}

        <Select
          label="Country"
          options={citiesByCountry}
          registerProps={register('country')}
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
            disabled={type?.defaultShipping}
            onChange={() => {
              setDefaultShippingAddress(!defaultShippingAddress);
            }}
          />
        )}

        {editmode && (
          <CheckboxInput
            label="Set as default billing address"
            checked={defaultBillingAddress || false}
            disabled={type?.defaultBilling}
            onChange={() => {
              setDefaultBillingAddress(!defaultBillingAddress);
            }}
          />
        )}
      </fieldset>

      <div className="button-wrap">
        {!editmode && <Button title="delete" onClick={onDelete} />}
        {!editmode && <Button title="edit" onClick={() => setEditmode(true)} />}
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
