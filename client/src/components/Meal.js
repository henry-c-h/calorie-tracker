import { useState, useEffect } from 'react';
import DonutChart from './DonutChart';
import FoodTable from './FoodTable';
import FoodSearchArea from './FoodSearchArea';
import { useSelector } from 'react-redux';
import {
  selectFoodList,
  selectFoodListStatus,
} from '../features/foodListSlice';
import { sumMacros } from '../utils';

const Meal = (props) => {
  const [expand, setExpand] = useState(true);
  const [showAddButton, setShowAddButton] = useState(true);
  const [showSearchArea, setShowSearchArea] = useState(false);

  const foodList = useSelector(selectFoodList).filter(
    (food) =>
      food.mealType === props.mealType &&
      food.dateConsumed.slice(0, 10) === props.currentDate.toISO().slice(0, 10)
  );

  const foodListStatus = useSelector(selectFoodListStatus);
  const error = useSelector((state) => state.foodList.error);

  useEffect(() => {
    setShowAddButton(true);
    setShowSearchArea(false);
  }, [props.currentDate]);

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

  let content;

  if (foodListStatus === 'loading') {
    content = <p className="diary-status">Loading...</p>;
  } else if (foodListStatus === 'succeeded') {
    content = (
      <div className="meal-info">
        {foodList.length > 0 ? (
          <DonutChart
            labelList={['protein', 'carbs', 'fat']}
            dataList={[
              sumMacros(foodList, 'protein'),
              sumMacros(foodList, 'carbs'),
              sumMacros(foodList, 'fat'),
            ]}
            text={
              Math.floor(sumMacros(foodList, 'totalCalories')) > 1000000
                ? `${Math.floor(
                    sumMacros(foodList, 'totalCalories') / 1000000
                  )}m kcal`
                : `${Math.floor(sumMacros(foodList, 'totalCalories'))} kcal`
            }
          />
        ) : null}
        <div className="food-container">
          <FoodTable
            mealType={props.mealType}
            currentDate={props.currentDate}
          />
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
              currentDate={props.currentDate}
            />
          ) : null}
        </div>
      </div>
    );
  } else if (foodListStatus === 'failed') {
    content = <p className="diary-status">{error}</p>;
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
        {expand ? content : null}
      </div>
    </div>
  );
};

export default Meal;
