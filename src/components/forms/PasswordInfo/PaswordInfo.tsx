import { MyCustomerChangePassword } from '@commercetools/platform-sdk';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PasswordInput from '../../common/PasswordInput/PasswordInput';
import { passwordValidation } from '../../../utils/validation/passwordValidation';

export const PasswordInfo: React.FC = () => {
  const [editmode, setEditmode] = useState(false);
  const {
    register,
    formState: { errors }
  } = useForm<MyCustomerChangePassword>({
    mode: 'onChange'
  });

  return (
    <fieldset className="password-info">
      <legend>Password Information</legend>
      {editmode && (
        <>
          <PasswordInput
            label="Current Password"
            placeholder="Password"
            inputProps={register('currentPassword', passwordValidation)}
            error={errors.currentPassword}
          />
          <PasswordInput
            label="New Password"
            placeholder="Password"
            inputProps={register('newPassword', passwordValidation)}
            error={errors.newPassword}
          />
        </>
      )}
      <div className="button-wrap">
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
    </fieldset>
  );
};
