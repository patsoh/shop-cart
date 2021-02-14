import React from 'react';
import { useSelector } from 'react-redux';

import { allProductsSelector } from '../productsSlice';
import { priceFormat } from '../../../utils';

export const OrderSummary = () => {
  const products = useSelector(allProductsSelector);

  const countTotalCost = (products) =>
    products.reduce((acc, { price, quantity }) => acc + price * quantity, 0);

  const countedTotalCost = () => {
    const cost = countTotalCost(products);
    return priceFormat(cost);
  };

  return <div>Całkowity koszt zamówienia: {countedTotalCost()}</div>;
};
