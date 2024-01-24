// store.js
import { StoreCreator } from 'redux';
import rootReducer from './rootReducer';

const store = StoreCreator(rootReducer);

export default store;
