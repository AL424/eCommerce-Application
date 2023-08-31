import { MyCustomerChangePassword } from '@commercetools/platform-sdk';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import PasswordInput from '../../common/PasswordInput/PasswordInput';
import { passwordValidation } from '../../../utils/validation/passwordValidation';
import { Button } from '../../buttons/button';

export const PasswordInfo: React.FC = () => {
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
  const onSave: SubmitHandler<MyCustomerChangePassword> = (data) => {
    console.log(data);
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
              inputProps={register('currentPassword', passwordValidation)}
              error={errors.currentPassword}
            />
            <PasswordInput
              label="New Password"
              placeholder="Password"
              inputProps={register('newPassword', passwordValidation)}
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
