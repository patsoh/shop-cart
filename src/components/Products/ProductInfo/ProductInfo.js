import React, { memo } from 'react';

import { priceFormat } from '../../../utils';

export const ProductInfo = memo(({ name, price }) => {
  return (
    <div>
      {name}, cena: {priceFormat(price)}
    </div>
  );
});
