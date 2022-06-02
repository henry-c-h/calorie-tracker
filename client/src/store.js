import { configureStore } from '@reduxjs/toolkit';
import foodListReducer from './features/foodListSlice';
import goalsReducer from './features/goalSlice';

export default configureStore({
  reducer: {
    foodList: foodListReducer,
    goals: goalsReducer,
  },
});
