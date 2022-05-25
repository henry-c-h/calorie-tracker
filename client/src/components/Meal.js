import { useState } from 'react';
import DonutChart from './DonutChart';
import FoodTable from './FoodTable';
import FoodSearchArea from './FoodSearchArea';

import searchResults from '../autocomplete.json';
import ingredientInfo from '../ingredientInfo.json';

const Meal = (props) => {
  const macros = ['Protein', 'Carbohydrates', 'Fat'];
  const [expand, setExpand] = useState(true);
  const [showAddButton, setShowAddButton] = useState(true);
  const [showSearchArea, setShowSearchArea] = useState(false);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [showFoodCard, setShowFoodCard] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('');
  const [fetchInProgess, setFetchInProgress] = useState(false);

  function handleExpandIconClick() {
    setExpand((prev) => !prev);
  }

  function handleAddButtonClick() {
    setShowAddButton(false);
    setShowSearchArea(true);
  }

  function handleCloseSearch() {
    setShowAddButton(true);
    setShowSearchArea(false);
    setInputValue('');
    setSearchValue('');
    setUnit('');
    setQuantity(1);
  }

  function handleSearchInputChange(e) {
    setInputValue(e.target.value);
    setShowAutocomplete(true);
    if (!e.target.value) setShowAutocomplete(false);
    setShowFoodCard(false);
  }

  function handleIngredientClick(id) {
    setShowAutocomplete(false);
    setSearchValue(
      searchResults.results.filter((result) => result.id === id)[0].name
    );
    setInputValue('');
    setShowFoodCard(true);
  }

  function handleQuantityChange(e) {
    setQuantity(e.target.value);
    // TODO
    setFetchInProgress(true);
  }

  function handleUnitChange(e) {
    setUnit(e.target.value);
  }

  function handleClearSearch() {
    setInputValue('');
  }

  function handleAddFoodClick(newFood) {
    props.setConsumedFood((oldList) => [newFood, ...oldList]);
    setShowFoodCard(false);
    setUnit('');
    setQuantity(1);
    setSearchValue('');
  }

  function handleCancelAddFoodClick() {
    setShowFoodCard(false);
    setUnit('');
    setQuantity(1);
    setSearchValue('');
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
                  showAutocomplete={showAutocomplete}
                  showFoodCard={showFoodCard}
                  handleSearchInputChange={handleSearchInputChange}
                  inputValue={inputValue}
                  searchResults={searchResults}
                  handleIngredientClick={handleIngredientClick}
                  handleClearSearch={handleClearSearch}
                  handleCloseSearch={handleCloseSearch}
                  ingredientInfo={ingredientInfo}
                  macros={macros}
                  searchValue={searchValue}
                  unit={unit}
                  handleUnitChange={handleUnitChange}
                  quantity={quantity}
                  handleQuantityChange={handleQuantityChange}
                  fetchInProgess={fetchInProgess}
                  handleAddFoodClick={handleAddFoodClick}
                  handleCancelAddFoodClick={handleCancelAddFoodClick}
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
