import React from 'react';
import { useSelector } from 'react-redux';

import { allProductsSelector } from '../productsSlice';
import { ProductInfo } from '../ProductInfo/ProductInfo';
import { ProductQuantity } from '../ProductQuantity/ProductQuantity';
import './Products.css';

export const Products = () => {
  const products = useSelector(allProductsSelector);

  return (
    <div>
      <h3>Lista produktów</h3>
      <ul>
        {products.map((product) => (
          <li className="product" key={product.pid}>
            <ProductInfo name={product.name} price={product.price} />
            <ProductQuantity
              pid={product.pid}
              min={product.min}
              max={product.max}
              quantity={product.quantity}
              isBlocked={product.isBlocked}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
