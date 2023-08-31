import React, { useEffect, useState } from 'react';
import { Customer } from '@commercetools/platform-sdk';
import Input from '../../common/Input/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { emailValidation } from '../../../utils/validation/emailValidation';
import { nameValidation } from '../../../utils/validation/nameValidation';
import { Button } from '../../buttons/button';
import { ageValidation } from '../../../utils/validation/ageValidation';

interface PersonalInfoProps {
  customer: Customer;
}

interface PersonalInfoChange {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ customer }) => {
  const [editmode, setEditmode] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<PersonalInfoChange>({
    mode: 'onChange'
  });

  // функции обработчика
  const onSave: SubmitHandler<PersonalInfoChange> = (data) => {
    console.log(data);
  };
  const onCancel = () => {
    setEditmode((prev) => !prev);
  };

  useEffect(() => {
    setValue('email', customer.email);
    setValue('firstName', customer.firstName || '');
    setValue('lastName', customer.lastName || '');
    setValue('dateOfBirth', customer.dateOfBirth || '');
  }, [customer, setValue]);

  return (
    <>
      <h2 className="profile__sub-title">Personal Information</h2>
      <form onSubmit={handleSubmit(onSave)}>
        <fieldset disabled={!editmode} className="personal-info">
          <Input
            label="E-mail"
            placeholder="email@example.com"
            inputProps={register('email', emailValidation)}
            error={errors.email}
          />

          <Input
            label="Name"
            placeholder="John"
            inputProps={register('firstName', nameValidation)}
            error={errors.firstName}
          />

          <Input
            label="Surname"
            placeholder="Doe"
            inputProps={register('lastName', {
              ...nameValidation,
              required: 'Surname is required'
            })}
            error={errors.lastName}
          />

          <Input
            label="Date of Birth"
            type="date"
            inputProps={register('dateOfBirth', ageValidation)}
            error={errors.dateOfBirth}
          />
        </fieldset>
        <div className="button-wrap">
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
    </>
  );
};
