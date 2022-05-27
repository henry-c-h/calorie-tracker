import { createSlice } from '@reduxjs/toolkit';
import { foodList } from '../data';

export const foodListSlice = createSlice({
  name: 'foodList',
  initialState: foodList,
  reducers: {
    addFoodItem: (state, action) => {
      const newFoodItem = {
        id: Date.now(),
        ...action.payload,
      };
      state.push(newFoodItem);
    },
    removeFoodItem: (state, action) => {
      return state.filter((food) => food.id !== action.payload);
    },
    increaseItemQuantity: (state, action) => {
      const idx = state.findIndex((food) => food.id === action.payload);
      state[idx].quantity++;
      state[idx].totalCalories += state[idx].unitCalories;
      state[idx].protein += state[idx].unitProtein;
      state[idx].fat += state[idx].unitFat;
      state[idx].carbs += state[idx].unitCarbs;
    },
    decreaseItemQuantity: (state, action) => {
      const idx = state.findIndex((food) => food.id === action.payload);
      if (state[idx].quantity - 1 > 0) {
        state[idx].quantity--;
        state[idx].totalCalories -= state[idx].unitCalories;
        state[idx].protein -= state[idx].unitProtein;
        state[idx].fat -= state[idx].unitFat;
        state[idx].carbs -= state[idx].unitCarbs;
      }
    },
  },
});

export const selectFoodList = (state) => state.foodList;
export const {
  addFoodItem,
  removeFoodItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} = foodListSlice.actions;
export default foodListSlice.reducer;
