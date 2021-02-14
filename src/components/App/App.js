import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getProducts,
  productsLoadingSelector,
} from '../Products/productsSlice';
import { Products } from '../Products/Products/Products';
import { OrderSummary } from '../Products/OrderSummary/OrderSummary';
import { Spinner } from '../Common/Spinner/Spinner';
import './App.css';

export const App = () => {
  const dispatch = useDispatch();
  const productsLoading = useSelector(productsLoadingSelector);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className="container">
      {productsLoading ? (
        <Spinner />
      ) : (
        <>
          <Products />
          <OrderSummary />
        </>
      )}
    </div>
  );
};
