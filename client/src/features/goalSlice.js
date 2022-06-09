import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { convertRatioToGrams } from '../utils';

const initialState = {
  goal: {
    calorieGoal: 2000,
    protein: 35,
    carbs: 40,
    fat: 25,
    proteinInGrams: convertRatioToGrams('protein', 35, 2000),
    carbsInGrams: convertRatioToGrams('carbs', 40, 2000),
    fatInGrams: convertRatioToGrams('fat', 25, 2000),
  },
  fetchStatus: 'idle',
  updateStatus: 'idle',
};

export const fetchGoalsAsync = createAsyncThunk(
  'goals/fetchGoals',
  async (user) => {
    const response = await fetch('/api/goal', {
      headers: {
        'Content-Type': 'application/json',
        user: user,
      },
    });
    const data = await response.json();
    if (!data) {
      const defaultGoal = await fetch('/api/goal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          user: user,
        },
        body: JSON.stringify(initialState.goal),
      });
      const data = defaultGoal.json();
      return data;
    }
    return data;
  }
);

export const updateGoalsAsync = createAsyncThunk(
  'goals/updateGoals',
  async ({ id, calorieGoal, protein, carbs, fat }) => {
    const response = await fetch(`/api/goal/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        calorieGoal,
        protein,
        carbs,
        fat,
        proteinInGrams: convertRatioToGrams('protein', protein, calorieGoal),
        carbsInGrams: convertRatioToGrams('carbs', carbs, calorieGoal),
        fatInGrams: convertRatioToGrams('fat', fat, calorieGoal),
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  }
);

export const goalsSlice = createSlice({
  name: 'goals',
  initialState: initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchGoalsAsync.pending, (state, action) => {
        state.fetchStatus = 'loading';
      })
      .addCase(fetchGoalsAsync.fulfilled, (state, action) => {
        state.fetchStatus = 'success';
        state.goal = action.payload;
      })
      .addCase(updateGoalsAsync.pending, (state, action) => {
        state.updateStatus = 'loading';
      })
      .addCase(updateGoalsAsync.fulfilled, (state, action) => {
        state.updateStatus = 'success';
        state.goal = action.payload;
      });
  },
});

export const selectGoals = (state) => state.goals.goal;
export const selectGoalUpdateStatus = (state) => state.goals.updateStatus;
export const selectGoalFetchStatus = (state) => state.goals.fetchStatus;
export default goalsSlice.reducer;
