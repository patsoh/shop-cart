import React, { memo, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import { productsActions, checkProductQuantity } from '../productsSlice';
import { useDidUpdateEffect } from '../../../hooks';
import './ProductQuantity.css';

export const ProductQuantity = memo(
  ({ min, max, quantity, pid, isBlocked }) => {
    const dispatch = useDispatch();

    const handleIncreaseProductQuantity = () => {
      dispatch(productsActions.increaseProductQuantity(pid));
    };

    const handleDecreaseProductQuantity = () => {
      dispatch(productsActions.decreaseProductQuantity(pid));
    };

    const isIncreaseButtonDisabled = useMemo(() => {
      const reachedMaxProductsQuantity = quantity === max;
      return isBlocked || reachedMaxProductsQuantity;
    }, [isBlocked, max, quantity]);

    const isDecreaseButtonDisabled = useMemo(() => {
      const reachedMinProductsQuantity = quantity === min;
      return isBlocked || reachedMinProductsQuantity;
    }, [isBlocked, min, quantity]);

    const checkProductQuantityHandler = useCallback(
      debounce((pid, quantity) => {
        dispatch(checkProductQuantity({ pid, quantity }));
      }, 1000),
      [],
    );

    useDidUpdateEffect(() => {
      checkProductQuantityHandler(pid, quantity);
    }, [quantity]);

    return (
      <div className="product-quantity">
        Obecnie masz {quantity} sztuk produktu
        <div className="product-quantity-buttons">
          <button
            type="button"
            className="product-quantity-button"
            onClick={handleDecreaseProductQuantity}
            disabled={isDecreaseButtonDisabled}
          >
            -
          </button>
          <button
            type="button"
            className="product-quantity-button"
            onClick={handleIncreaseProductQuantity}
            disabled={isIncreaseButtonDisabled}
          >
            +
          </button>
        </div>
      </div>
    );
  },
);
