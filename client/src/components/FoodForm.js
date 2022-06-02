import FoodUnitDropdown from './FoodUnitDropdown';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFoodItem } from '../features/foodListSlice';
import { getUnitCalories, getUnitMacro, calculateMacro } from '../utils';

const FoodForm = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('');
  const [fetchInProgress, setFetchInProgress] = useState(false);

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

  function handleSubmit(e) {
    e.preventDefault();
    const item = {
      foodId: props.ingredientInfo.id,
      food: props.currentItem.name,
      mealType: props.mealType,
      unit: unit,
      quantity: quantity,
      unitProtein: getUnitMacro('Protein', props.ingredientInfo),
      unitCarbs: getUnitMacro('Carbohydrates', props.ingredientInfo),
      unitFat: getUnitMacro('Fat', props.ingredientInfo),
      protein: calculateMacro('Protein', quantity, props.ingredientInfo),
      carbs: calculateMacro('Carbohydrates', quantity, props.ingredientInfo),
      fat: calculateMacro('Fat', quantity, props.ingredientInfo),
      unitCalories: getUnitCalories(props.ingredientInfo),
      totalCalories: quantity * getUnitCalories(props.ingredientInfo),
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
          max={999999}
          onChange={handleQuantityChange}
          value={quantity}
        />
      </div>
      {!unit ? null : !fetchInProgress ? (
        <div className="ingredient-form-row">
          <p>
            {`${Math.floor(quantity * getUnitCalories(props.ingredientInfo))}
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
