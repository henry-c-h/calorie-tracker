import { createSlice } from '@reduxjs/toolkit';
import { convertRatioToGrams } from '../utils';

const initialState = {
  calorieGoal: 2000,
  protein: 35,
  carbs: 40,
  fat: 25,
  proteinInGrams: convertRatioToGrams('protein', 35, 2000),
  carbsInGrams: convertRatioToGrams('carbs', 40, 2000),
  fatInGrams: convertRatioToGrams('fat', 25, 2000),
};

export const goalsSlice = createSlice({
  name: 'goals',
  initialState: initialState,
  reducers: {
    updateGoals: (state, action) => {
      return action.payload;
    },
    resetGoals: () => {
      return initialState;
    },
  },
});

export const selectGoals = (state) => state.goals;
export const { updateGoals, resetGoals } = goalsSlice.actions;
export default goalsSlice.reducer;
