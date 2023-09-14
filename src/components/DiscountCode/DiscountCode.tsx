import { SubmitHandler, useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import {
  MyCartAddDiscountCodeAction,
  MyCartRemoveDiscountCodeAction,
  MyCartUpdate
} from '@commercetools/platform-sdk';
import { useAppDispatch, useAppSelector } from '../../services/store/hooks';
import { updateCartById } from '../../services/eCommerceService/Cart';
import { toast } from 'react-toastify';
import { setCartData } from '../../services/store/cartSlice';

export const DiscountCode: React.FC = () => {
  const cart = useAppSelector((state) => state.cartData.value);
  const dispatch = useAppDispatch();

  const [useDiscountCode, setUseDiscountCode] = useState(false);

  useEffect(() => {
    const discountCodes = cart?.discountCodes.length;
    if (discountCodes) setUseDiscountCode(true);
    else setUseDiscountCode(false);
  }, [cart]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<MyCartAddDiscountCodeAction>({
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<MyCartAddDiscountCodeAction> = async (code) => {
    if (!cart) return;

    const action: MyCartAddDiscountCodeAction = {
      ...code,
      action: 'addDiscountCode'
    };
    const data: MyCartUpdate = {
      version: cart.version,
      actions: [action]
    };
    const resp = await updateCartById(cart.id, data);
    if (typeof resp === 'string') toast.error(resp);
    else {
      reset();
      dispatch(setCartData(resp));
      toast.success('Discount code was applied');
    }
  };

  const onDeleteCode = async () => {
    if (!cart) return;
    const actions = cart.discountCodes.map((item) => {
      const action: MyCartRemoveDiscountCodeAction = {
        action: 'removeDiscountCode',
        discountCode: item.discountCode
      };
      return action;
    });
    if (!actions.length) return;
    const data: MyCartUpdate = {
      version: cart.version,
      actions
    };
    console.log(data);
    const resp = await updateCartById(cart.id, data);
    if (typeof resp === 'string') toast.error(resp);
    else {
      dispatch(setCartData(resp));
      toast.info('Discount code was deleted');
    }
  };

  return (
    <form className="discount-code" onSubmit={handleSubmit(onSubmit)}>
      {!useDiscountCode && (
        <>
          <p>Do you have a discount code? Use it.</p>
          <input
            type="text"
            className="discount-code__input"
            placeholder="Enter dicount code..."
            {...register('code', {
              required: 'Discount code is required'
            })}
          />
          {errors.code && <p>{errors.code.message}</p>}
          <Button title="add code" type="submit" />
        </>
      )}
      {useDiscountCode && (
        <>
          <p>
            You use discount code. You can use other code after deleting this
            code.
          </p>
          <Button title="delete code" onClick={onDeleteCode} />
        </>
      )}
    </form>
  );
};
