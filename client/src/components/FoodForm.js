import FoodUnitDropdown from './FoodUnitDropdown';
import { useState } from 'react';
// import { useDispatch } from 'react-redux'
// import { addFoodItem } from '../features/mealSlice';

const FoodForm = (props) => {
  // const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('');
  const [fetchInProgess, setFetchInProgress] = useState(false);

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

  return (
    <form
      className="food-card-right"
      onSubmit={(e) => {
        e.preventDefault();
        props.handleAddFoodClick({
          food: props.currentItem.name,
          mealType: props.mealType,
          unit: unit,
          quantity: quantity,
          protein:
            quantity *
            props.ingredientInfo.nutrition.nutrients.filter(
              (nutrient) => nutrient.name === 'Protein'
            )[0].amount,
          carbs:
            quantity *
            props.ingredientInfo.nutrition.nutrients.filter(
              (nutrient) => nutrient.name === 'Carbohydrates'
            )[0].amount,
          fat:
            quantity *
            props.ingredientInfo.nutrition.nutrients.filter(
              (nutrient) => nutrient.name === 'Fat'
            )[0].amount,
          totalCalories:
            quantity *
            props.ingredientInfo.nutrition.nutrients.filter(
              (nutrient) => nutrient.name === 'Calories'
            )[0].amount,
        });
      }}
    >
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
      {!fetchInProgess ? (
        <div className="ingredient-form-row">
          <p>
            {`${
              quantity *
              props.ingredientInfo.nutrition.nutrients.filter(
                (nutrient) => nutrient.name === 'Calories'
              )[0].amount
            }
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
