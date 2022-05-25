import { configureStore } from '@reduxjs/toolkit';
import mealReducer from './features/mealSlice';

export default configureStore({
  reducer: {
    meal: mealReducer,
  },
});
