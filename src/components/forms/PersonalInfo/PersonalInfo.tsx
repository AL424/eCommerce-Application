import React, { useState } from 'react';
import { Customer } from '@commercetools/platform-sdk';
import Input from '../../common/Input/Input';
import { useForm } from 'react-hook-form';
import { emailValidation } from '../../../utils/validation/emailValidation';
import { nameValidation } from '../../../utils/validation/nameValidation';
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

  return (
    <>
      <fieldset disabled={!editmode} className="personal-info">
        <legend>Personal Information</legend>
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
