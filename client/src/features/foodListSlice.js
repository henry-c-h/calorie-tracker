import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUnitCalories, getUnitMacro, calculateMacro } from '../utils';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchFoodListAsync = createAsyncThunk(
  'foodList/fetchFoodList',
  async () => {
    const response = await fetch('/api/diary', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  }
);

export const addFoodItemAsync = createAsyncThunk(
  'foodList/addFoodItem',
  async ({ mealType, unit, quantity, ingredientInfo }) => {
    const newItem = {
      foodId: ingredientInfo.id,
      foodName: ingredientInfo.name,
      mealType: mealType,
      unit: unit,
      quantity: quantity,
      unitProtein: getUnitMacro('Protein', ingredientInfo),
      unitCarbs: getUnitMacro('Carbohydrates', ingredientInfo),
      unitFat: getUnitMacro('Fat', ingredientInfo),
      protein: calculateMacro('Protein', quantity, ingredientInfo),
      carbs: calculateMacro('Carbohydrates', quantity, ingredientInfo),
      fat: calculateMacro('Fat', quantity, ingredientInfo),
      unitCalories: getUnitCalories(ingredientInfo),
      totalCalories: quantity * getUnitCalories(ingredientInfo),
    };

    const response = await fetch('/api/diary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });
    const data = await response.json();
    return data;
  }
);

export const removeFoodItemAsync = createAsyncThunk(
  'foodList/removeFoodItem',
  async (id) => {
    const response = await fetch(`/api/diary/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      return id;
    }
  }
);

export const increaseItemQuantityAsync = createAsyncThunk(
  'foodList/increaseItemQuantity',
  async (food) => {
    const response = await fetch(`/api/diary/${food._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...food,
        quantity: food.quantity + 1,
        totalCalories: food.totalCalories + food.unitCalories,
        protein: food.protein + food.unitProtein,
        carbs: food.carbs + food.unitCarbs,
        fat: food.fat + food.unitFat,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  }
);

export const decreaseItemQuantityAsync = createAsyncThunk(
  'foodList/decreaseItemQuantity',
  async (food) => {
    const response = await fetch(`/api/diary/${food._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...food,
        quantity: food.quantity - 1,
        totalCalories: food.totalCalories - food.unitCalories,
        protein: food.protein - food.unitProtein,
        carbs: food.carbs - food.unitCarbs,
        fat: food.fat - food.unitFat,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  }
);

export const foodListSlice = createSlice({
  name: 'foodList',
  initialState: initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchFoodListAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchFoodListAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.concat(action.payload);
      })
      .addCase(fetchFoodListAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addFoodItemAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFoodItemAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((food) => food._id !== action.payload);
      })
      .addCase(increaseItemQuantityAsync.fulfilled, (state, action) => {
        const idx = state.items.findIndex(
          (food) => food._id === action.payload._id
        );
        state.items[idx] = action.payload;
      })
      .addCase(decreaseItemQuantityAsync.fulfilled, (state, action) => {
        const idx = state.items.findIndex(
          (food) => food._id === action.payload._id
        );
        state.items[idx] = action.payload;
      });
  },
});

export const selectFoodList = (state) => state.foodList.items;
export const selectFoodListStatus = (state) => state.foodList.status;
export default foodListSlice.reducer;
