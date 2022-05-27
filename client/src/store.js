import { configureStore } from '@reduxjs/toolkit';
import foodListReducer from './features/foodListSlice';

export default configureStore({
  reducer: {
    foodList: foodListReducer,
  },
});
