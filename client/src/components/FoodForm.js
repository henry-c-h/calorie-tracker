import FoodUnitDropdown from './FoodUnitDropdown';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFoodItemAsync } from '../features/foodListSlice';
import { getUnitCalories } from '../utils';

const FoodForm = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('');
  const [fetchInProgress, setFetchInProgress] = useState(false);

  const dispatch = useDispatch();

  function handleUnitChange(e) {
    setUnit(e.target.value);
    setFetchInProgress(true);

    fetch(`/api/diary/ingredient/${props.currentItem.id}/${e.target.value}`)
      .then((res) => res.json())
      .then((data) => {
        props.setIngredientInfo(data);
      })
      .then(setFetchInProgress(false));
  }

  function handleQuantityChange(e) {
    setQuantity(e.target.value);
  }

  function handleCancelAddFoodClick() {
    props.setCurrentItem(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      addFoodItemAsync({
        mealType: props.mealType,
        unit,
        quantity,
        ingredientInfo: props.ingredientInfo,
        currentDate: props.currentDate.toISO(),
      })
    );
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
