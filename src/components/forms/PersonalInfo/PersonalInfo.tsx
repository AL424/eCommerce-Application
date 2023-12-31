import React, { useEffect, useState } from 'react';
import {
  Customer,
  MyCustomerChangeEmailAction,
  MyCustomerSetDateOfBirthAction,
  MyCustomerSetFirstNameAction,
  MyCustomerSetLastNameAction,
  MyCustomerUpdate,
  MyCustomerUpdateAction
} from '@commercetools/platform-sdk';
import Input from '../../common/Input/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { emailValidation } from '../../../utils/validation/emailValidation';
import { nameValidation } from '../../../utils/validation/nameValidation';
import { Button } from '../../Button/Button';
import { ageValidation } from '../../../utils/validation/ageValidation';
import { customerUpdate } from '../../../services/eCommerceService/Customer';
import { toast } from 'react-toastify';

interface PersonalInfoProps {
  customer: Customer;
  setCustomer: React.Dispatch<React.SetStateAction<Customer>>;
}

interface PersonalInfoChange {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({
  customer,
  setCustomer
}) => {
  const [editmode, setEditmode] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<PersonalInfoChange>({
    mode: 'onChange'
  });

  const onCancel = () => {
    reset();
    setValue('email', customer.email);
    setValue('firstName', customer.firstName || '');
    setValue('lastName', customer.lastName || '');
    setValue('dateOfBirth', customer.dateOfBirth || '');
    setEditmode(false);
  };
  const onSave: SubmitHandler<PersonalInfoChange> = async (data) => {
    const actions: MyCustomerUpdateAction[] = [];

    if (data.email !== customer.email) {
      const change: MyCustomerChangeEmailAction = {
        action: 'changeEmail',
        email: data.email
      };
      actions.push(change);
    }
    if (data.firstName !== customer.firstName) {
      const change: MyCustomerSetFirstNameAction = {
        action: 'setFirstName',
        firstName: data.firstName
      };
      actions.push(change);
    }
    if (data.lastName !== customer.lastName) {
      const change: MyCustomerSetLastNameAction = {
        action: 'setLastName',
        lastName: data.lastName
      };
      actions.push(change);
    }
    if (data.dateOfBirth !== customer.dateOfBirth) {
      const change: MyCustomerSetDateOfBirthAction = {
        action: 'setDateOfBirth',
        dateOfBirth: data.dateOfBirth
      };
      actions.push(change);
    }

    if (actions.length === 0) {
      toast.info('Personal Information has not changed.');
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
      toast.success('Personal Information successfully updated!');
      setEditmode(false);
    }
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
