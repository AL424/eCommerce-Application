import {
  Customer,
  MyCustomerChangePassword
} from '@commercetools/platform-sdk';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import PasswordInput from '../../common/PasswordInput/PasswordInput';
import { passwordValidation } from '../../../utils/validation/passwordValidation';
import { Button } from '../../buttons/button';
import { toast } from 'react-toastify';
import { changePassword } from '../../../services/eCommerceService/Customer';

interface PasswordInfoProps {
  customer: Customer;
  setCustomer: React.Dispatch<React.SetStateAction<Customer>>;
}

export const PasswordInfo: React.FC<PasswordInfoProps> = ({
  customer,
  setCustomer
}) => {
  const [editmode, setEditmode] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<MyCustomerChangePassword>({
    mode: 'onChange'
  });

  // функции обработчика
  const onSave: SubmitHandler<MyCustomerChangePassword> = async (data) => {
    if (data.currentPassword === data.newPassword) {
      toast.info('New password cannot be current password.');
      return;
    }
    const dataReq: MyCustomerChangePassword = {
      ...data,
      version: customer.version
    };
    const response = await changePassword(dataReq);
    if (typeof response === 'string') {
      toast.error(response);
    } else if (response) {
      setCustomer(response);
      toast.success('Password successfully changed!');
      reset();
      setEditmode(false);
    }
  };
  const onCancel = () => {
    setEditmode(false);
    reset();
  };

  return (
    <>
      <h2 className="profile__sub-title">Password Change</h2>
      <form onSubmit={handleSubmit(onSave)}>
        {editmode && (
          <fieldset>
            <PasswordInput
              label="Current Password"
              placeholder="Password"
              inputProps={register('currentPassword', {
                ...passwordValidation,
                required: 'Current Password is required'
              })}
              error={errors.currentPassword}
            />
            <PasswordInput
              label="New Password"
              placeholder="Password"
              inputProps={register('newPassword', {
                ...passwordValidation,
                required: 'New Password is required'
              })}
              error={errors.newPassword}
            />
          </fieldset>
        )}
        <div className="button-wrap">
          {!editmode && (
            <Button title="change" onClick={() => setEditmode(true)} />
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
    </>
  );
};
