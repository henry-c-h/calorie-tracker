import { configureStore } from '@reduxjs/toolkit';
import foodListReducer from './features/foodListSlice';
import goalsReducer from './features/goalSlice';
import userReducer from './features/userSlice';

export default configureStore({
  reducer: {
    foodList: foodListReducer,
    goals: goalsReducer,
    user: userReducer,
  },
});
