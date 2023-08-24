import React, { useState } from 'react';

export const PersonalInfo: React.FC = () => {
  const [disabled, setDisabled] = useState(true);
  const setEditMode = () => {
    if (disabled) setDisabled(false);
    setDisabled(true);
  };

  // const [customer, setCustomer] = useState();

  return (
    <form>
      <fieldset disabled={disabled}></fieldset>
      <button onClick={() => setEditMode()}>Edit</button>
    </form>
  );
};
