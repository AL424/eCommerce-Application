import React, { useState } from 'react';
import { Button } from '../../buttons/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Address,
  Customer,
  MyCustomerAddAddressAction,
  MyCustomerUpdate
} from '@commercetools/platform-sdk';
import Select from '../../common/Select/Select';
import Input from '../../common/Input/Input';
import citiesByCountry from '../../../utils/constants/countries.constants';
import { cityValidation } from '../../../utils/validation/cityValidation';
import { postalCodeValidation } from '../../../utils/validation/postalCodeValidation';
import { streetValidation } from '../../../utils/validation/streetValidation';
import { buildingValidation } from '../../../utils/validation/buildingValidation';
import { customerUpdate } from '../../../services/eCommerceService/Customer';
import { toast } from 'react-toastify';

interface AddAddressProps {
  customer: Customer;
  setCustomer: React.Dispatch<React.SetStateAction<Customer>>;
}

export const AddAddress: React.FC<AddAddressProps> = ({
  customer,
  setCustomer
}) => {
  const [editmode, setEditmode] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<Address>({
    mode: 'onChange'
  });
  // функции обработчика
  const onCancel = () => {
    reset();
    setEditmode(false);
  };
  const onSave: SubmitHandler<Address> = async (data) => {
    const action: MyCustomerAddAddressAction = {
      action: 'addAddress',
      address: data
    };
    const dataAddAddress: MyCustomerUpdate = {
      version: customer.version,
      actions: [action]
    };
    const response = await customerUpdate(dataAddAddress);
    if (typeof response === 'string') {
      reset();
      setEditmode(false);
      toast.error(response);
    } else {
      reset();
      setEditmode(false);
      toast.success('Address added successfully!');
      setCustomer(response);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSave)}>
      {editmode && (
        <fieldset>
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
        </fieldset>
      )}
      <div className="button-wrap">
        {!editmode && (
          <Button title="Add address" onClick={() => setEditmode(true)} />
        )}
        {editmode && (
          <Button
            title="cancel"
            classList={['button_cancel']}
            onClick={onCancel}
          />
        )}
        {editmode && (
          <Button
            type="submit"
            title="Add Address"
            classList={['button_save']}
          />
        )}
      </div>
    </form>
  );
};
