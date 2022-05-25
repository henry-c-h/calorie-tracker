import './App.css';
import Navbar from './components/Navbar';
import Summary from './components/Summary';
import Meal from './components/Meal';
import { foodList } from './data';
import { useState } from 'react';

function App() {
  const [consumedFood, setConsumedFood] = useState(foodList);

  return (
    <div className="app">
      <Navbar />
      <Summary
        consumedRatio={0.6}
        proteinRatio={0.3}
        carbsRatio={0.8}
        fatRatio={0.5}
      />
      <Meal
        mealType="breakfast"
        titleText="Breakfast 🥐"
        foodList={consumedFood.filter((food) => food.mealType === 'breakfast')}
        setConsumedFood={setConsumedFood}
      />
      <Meal
        mealType="lunch"
        titleText="Lunch 🍱"
        foodList={consumedFood.filter((food) => food.mealType === 'lunch')}
        setConsumedFood={setConsumedFood}
      />
      <Meal
        mealType="dinner"
        titleText="Dinner 🍛"
        foodList={consumedFood.filter((food) => food.mealType === 'dinner')}
        setConsumedFood={setConsumedFood}
      />
      <Meal
        mealType="snacks"
        titleText="Snacks 🍩"
        foodList={consumedFood.filter((food) => food.mealType === 'snacks')}
        setConsumedFood={setConsumedFood}
      />
    </div>
  );
}

export default App;
