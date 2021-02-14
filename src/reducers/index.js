import { combineReducers } from 'redux';
import products from '../components/Products/productsSlice';

const rootReducer = combineReducers({
  products,
});

export default rootReducer;
