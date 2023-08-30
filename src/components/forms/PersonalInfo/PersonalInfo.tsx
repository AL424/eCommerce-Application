import React, { useState } from 'react';
import { Customer } from '@commercetools/platform-sdk';
import Input from '../../common/Input/Input';
import { useForm } from 'react-hook-form';
import { emailValidation } from '../../../utils/validation/emailValidation';
import { nameValidation } from '../../../utils/validation/nameValidation';
import { Button } from '../../buttons/button';
// import { ageValidation } from '../../../utils/validation/ageValidation';

interface PersonalInfoProps {
  customer: Customer;
}

interface PersonalInfoChange {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ customer }) => {
  const [editmode, setEditmode] = useState(false);
  const {
    register,
    formState: { errors }
  } = useForm<PersonalInfoChange>({
    mode: 'onChange'
  });

  // функции обработчика
  const onSave = () => {
    setEditmode((prev) => !prev);
  };
  const onCancel = () => {
    setEditmode((prev) => !prev);
  };

  return (
    <>
      <h2 className="profile__sub-title">Personal Information</h2>
      <fieldset disabled={!editmode} className="personal-info">
        <Input
          label="E-mail"
          placeholder="email@example.com"
          inputProps={register('email', emailValidation)}
          error={errors.email}
          defaultValue={customer.email}
        />

        <Input
          label="Name"
          placeholder="John"
          inputProps={register('firstName', nameValidation)}
          error={errors.firstName}
          defaultValue={customer.firstName}
        />

        <Input
          label="Surname"
          placeholder="Doe"
          inputProps={register('lastName', {
            ...nameValidation,
            required: 'Surname is required'
          })}
          error={errors.lastName}
          defaultValue={customer.lastName}
        />

        {/* Разобраться с валидацией даты рождения */}
        <Input
          label="Date of Birth"
          type="date"
          inputProps={register('dateOfBirth')}
          error={errors.dateOfBirth}
          defaultValue={customer.dateOfBirth}
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
          <Button title="save" classList={['button_save']} onClick={onSave} />
        )}
      </div>
    </>
  );
};
