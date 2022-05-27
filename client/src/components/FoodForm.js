import FoodUnitDropdown from './FoodUnitDropdown';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFoodItem } from '../features/foodListSlice';

const FoodForm = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('');
  const [fetchInProgess, setFetchInProgress] = useState(false);

  const dispatch = useDispatch();

  function handleUnitChange(e) {
    setUnit(e.target.value);
    setFetchInProgress(true);
    setTimeout(() => {
      // TODO
      // add fetch ingredientInfo logic
      setFetchInProgress(false);
    }, 1000);
  }

  function handleQuantityChange(e) {
    setQuantity(e.target.value);
  }

  function handleCancelAddFoodClick() {
    props.setCurrentItem(null);
  }

  function getUnitCalories() {
    return props.ingredientInfo.nutrition.nutrients.filter(
      (nutrient) => nutrient.name === 'Calories'
    )[0].amount;
  }

  function getUnitMacro(macroType) {
    return props.ingredientInfo.nutrition.nutrients.filter(
      (nutrient) => nutrient.name === macroType
    )[0].amount;
  }

  function calculateMacro(macroType) {
    return quantity * getUnitMacro(macroType);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const item = {
      foodId: props.ingredientInfo.id,
      food: props.currentItem.name,
      mealType: props.mealType,
      unit: unit,
      quantity: quantity,
      unitProtein: getUnitMacro('Protein'),
      unitCarbs: getUnitMacro('Carbohydrates'),
      unitFat: getUnitMacro('Fat'),
      protein: calculateMacro('Protein'),
      carbs: calculateMacro('Carbohydrates'),
      fat: calculateMacro('Fat'),
      unitCalories: getUnitCalories(),
      totalCalories: quantity * getUnitCalories(),
    };
    dispatch(addFoodItem(item));
  }

  return (
    <form className="food-card-right" onSubmit={handleSubmit}>
      <p className="ingredient-form-row">
        <span className="nutrition-icon">
          <img src="./assets/nutrition-icon.svg" alt="nutrition icon" />
        </span>
        {props.currentItem.name}
      </p>
      <div className="ingredient-form-row">
        <label htmlFor="food-unit">unit</label>
        <FoodUnitDropdown
          unit={unit}
          handleUnitChange={handleUnitChange}
          ingredientInfo={props.ingredientInfo}
        />
      </div>
      <div className="ingredient-form-row">
        <label htmlFor="food-quantity">quantity</label>
        <input
          type="number"
          name="food-quantity"
          id="food-quantity"
          min={1}
          onChange={handleQuantityChange}
          value={quantity}
        />
      </div>
      {!unit ? null : !fetchInProgess ? (
        <div className="ingredient-form-row">
          <p>
            {`${Math.floor(quantity * getUnitCalories())}
            calories`}
          </p>
        </div>
      ) : (
        <div className="ingredient-form-row">
          <p>Calculating...</p>
        </div>
      )}
      <div className="ingredient-form-row">
        <button type="submit">Confirm add</button>
        <button type="button" onClick={handleCancelAddFoodClick}>
          Cancel add
        </button>
      </div>
    </form>
  );
};

export default FoodForm;
