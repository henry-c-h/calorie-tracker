import DonutChart from './DonutChart';
import FoodForm from './FoodForm';
import { useState, useEffect } from 'react';

const FoodCard = (props) => {
  const [ingredientInfo, setIngredientInfo] = useState(null);
  const macros = ['Protein', 'Carbohydrates', 'Fat'];

  useEffect(() => {
    fetch(`/api/diary/ingredient/${props.currentItem.id}`)
      .then((res) => res.json())
      .then((data) => setIngredientInfo(data));
  }, [props.currentItem]);

  return (
    <>
      {!ingredientInfo ? (
        <div className="food-card fetch-begin">🍔 Fetching food data...</div>
      ) : (
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
            currentDate={props.currentDate}
          />
        </div>
      )}
    </>
  );
};

export default FoodCard;
