import { useState } from 'react';
import DonutChart from './DonutChart';
import FoodTable from './FoodTable';
import FoodSearchArea from './FoodSearchArea';

const Meal = (props) => {
  const [expand, setExpand] = useState(true);
  const [showAddButton, setShowAddButton] = useState(true);
  const [showSearchArea, setShowSearchArea] = useState(false);

  function handleExpandIconClick() {
    setExpand((prev) => !prev);
  }

  function handleAddButtonClick() {
    setShowAddButton(false);
    setShowSearchArea(true);
  }

  function handleCloseSearchClick() {
    setShowSearchArea(false);
    setShowAddButton(true);
  }

  function handleAddFoodClick(newFood) {
    props.setConsumedFood((oldList) => [newFood, ...oldList]);
  }

  function handleDeleteFood(id) {
    props.setConsumedFood((oldList) =>
      oldList.filter((food) => food.id !== id)
    );
  }

  function sumMacros(foodList, macroType) {
    const macroList = foodList.map((food) => food[macroType]);
    return macroList.reduce((prev, current) => prev + current);
  }

  return (
    <div className="meal-container">
      <div className="meal-card">
        <p className="meal-title">
          {props.titleText}
          <span className="expand-icon" onClick={handleExpandIconClick}>
            {expand ? (
              <img src="./assets/collapse-icon.svg" alt="collapse icon" />
            ) : (
              <img src="./assets/expand-icon.svg" alt="expand icon" />
            )}
          </span>
        </p>
        {expand ? (
          <div className="meal-info">
            {props.foodList.length > 0 ? (
              <DonutChart
                labelList={['protein', 'carbs', 'fat']}
                dataList={[
                  sumMacros(props.foodList, 'protein'),
                  sumMacros(props.foodList, 'carbs'),
                  sumMacros(props.foodList, 'fat'),
                ]}
                text={`${Math.round(
                  sumMacros(props.foodList, 'totalCalories')
                )} kcal`}
              />
            ) : null}
            <div className="food-container">
              <FoodTable
                foodList={props.foodList}
                handleDeleteFood={handleDeleteFood}
              />
              {showAddButton ? (
                <>
                  {props.foodList.length === 0 ? (
                    <p className="empty-cta">
                      The diary is empty. Start by adding food items.
                    </p>
                  ) : null}
                  <button onClick={handleAddButtonClick}>
                    Add food
                    <span>
                      <img src="./assets/add-icon.svg" alt="add icon" />
                    </span>
                  </button>
                </>
              ) : null}
              {showSearchArea ? (
                <FoodSearchArea
                  mealType={props.mealType}
                  handleAddFoodClick={handleAddFoodClick}
                  handleCloseSearchClick={handleCloseSearchClick}
                />
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Meal;
