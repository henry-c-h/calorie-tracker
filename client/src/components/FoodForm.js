import FoodUnitDropdown from './FoodUnitDropdown';

const FoodForm = (props) => {
  return (
    <form
      className="food-card-right"
      onSubmit={(e) => {
        e.preventDefault();
        props.handleAddFoodClick({
          food: props.searchValue,
          mealType: props.mealType,
          unit: props.unit,
          quantity: props.quantity,
          protein:
            props.quantity *
            props.ingredientInfo.nutrition.nutrients.filter(
              (nutrient) => nutrient.name === 'Protein'
            )[0].amount,
          carbs:
            props.quantity *
            props.ingredientInfo.nutrition.nutrients.filter(
              (nutrient) => nutrient.name === 'Carbohydrates'
            )[0].amount,
          fat:
            props.quantity *
            props.ingredientInfo.nutrition.nutrients.filter(
              (nutrient) => nutrient.name === 'Fat'
            )[0].amount,
          totalCalories:
            props.quantity *
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
        {props.searchValue}
      </p>
      <div className="ingredient-form-row">
        <label htmlFor="food-unit">unit</label>
        <FoodUnitDropdown
          unit={props.unit}
          handleUnitChange={props.handleUnitChange}
          searchResults={props.searchResults}
          searchValue={props.searchValue}
        />
      </div>
      <div className="ingredient-form-row">
        <label htmlFor="food-quantity">quantity</label>
        <input
          type="number"
          name="food-quantity"
          id="food-quantity"
          min={1}
          onChange={props.handleQuantityChange}
          value={props.quantity}
        />
      </div>
      {props.unit ? (
        <div className="ingredient-form-row">
          <p>
            {`${
              props.quantity *
              props.ingredientInfo.nutrition.nutrients.filter(
                (nutrient) => nutrient.name === 'Calories'
              )[0].amount
            }
            calories`}
          </p>
        </div>
      ) : props.fetchInProgess ? (
        <div className="ingredient-form-row">
          <p>Calculating...</p>
        </div>
      ) : null}

      <div className="ingredient-form-row">
        <button type="submit">Confirm add</button>
        <button type="button" onClick={props.handleCancelAddFoodClick}>
          Cancel add
        </button>
      </div>
    </form>
  );
};

export default FoodForm;
