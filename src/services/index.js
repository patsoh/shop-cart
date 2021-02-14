import axios from 'axios';

const getProductsService = () => axios.get('/api/cart');
const checkProductQuantityService = (payload) =>
  axios.post('/api/product/check', payload);

export { getProductsService, checkProductQuantityService };
