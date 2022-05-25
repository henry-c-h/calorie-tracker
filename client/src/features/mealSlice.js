import { createSlice } from '@reduxjs/toolkit';
import { foodList } from '../data';

export const mealSlice = createSlice({
  name: 'foodList',
  initialState: foodList,
  reducers: {
    addFoodItem: (state, action) => {
      const newFoodItem = {
        food: 'bacon',
        unit: 'piece',
        quantity: 1,
        protein: 2,
        carbs: 10,
        fat: 4,
        totalCalories: 100,
        id: Date.now(),
        mealType: 'breakfast',
      };
      state.push(newFoodItem);
    },
  },
});

export const { addFoodItem } = mealSlice.actions;
export default mealSlice.reducer;
