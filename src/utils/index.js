const priceFormat = (price) => {
  const formattedPrice = Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
  }).format(price);

  return formattedPrice;
};

export { priceFormat };
