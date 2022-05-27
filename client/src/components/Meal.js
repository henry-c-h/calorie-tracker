import { useState } from 'react';
import DonutChart from './DonutChart';
import FoodTable from './FoodTable';
import FoodSearchArea from './FoodSearchArea';
import { useSelector } from 'react-redux';
import { selectFoodList } from '../features/foodListSlice';

const Meal = (props) => {
  const [expand, setExpand] = useState(true);
  const [showAddButton, setShowAddButton] = useState(true);
  const [showSearchArea, setShowSearchArea] = useState(false);

  const foodList = useSelector(selectFoodList).filter(
    (food) => food.mealType === props.mealType
  );

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
            {foodList.length > 0 ? (
              <DonutChart
                labelList={['protein', 'carbs', 'fat']}
                dataList={[
                  sumMacros(foodList, 'protein'),
                  sumMacros(foodList, 'carbs'),
                  sumMacros(foodList, 'fat'),
                ]}
                text={`${Math.round(
                  sumMacros(foodList, 'totalCalories')
                )} kcal`}
              />
            ) : null}
            <div className="food-container">
              <FoodTable mealType={props.mealType} />
              {showAddButton ? (
                <>
                  {foodList.length === 0 ? (
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
