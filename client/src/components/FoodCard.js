import DonutChart from './DonutChart';
import FoodForm from './FoodForm';
import ingredient from '../ingredientInfo.json';
import { useState } from 'react';

const FoodCard = (props) => {
  const [ingredientInfo, setIngredientInfo] = useState(ingredient);
  const macros = ['Protein', 'Carbohydrates', 'Fat'];

  // TODO
  // fetch ingredient info here

  return (
    <div className="food-card">
      <DonutChart
        labelList={['protein', 'carbs', 'fat']}
        dataList={ingredientInfo.nutrition.nutrients
          .filter((nutrient) => macros.includes(nutrient.name))
          .sort((a, b) => macros.indexOf(a.name) - macros.indexOf(b.name))
          .map((macro) => macro.amount)}
        text="nutrition profile"
      />
      <FoodForm
        mealType={props.mealType}
        currentItem={props.currentItem}
        setCurrentItem={props.setCurrentItem}
        ingredientInfo={ingredientInfo}
        setIngredientInfo={setIngredientInfo}
        handleAddFoodClick={props.handleAddFoodClick}
      />
    </div>
  );
};

export default FoodCard;
