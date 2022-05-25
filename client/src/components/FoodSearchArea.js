import SearchBar from './SearchBar';
import FoodCard from './FoodCard';

const FoodSearchArea = (props) => {
  return (
    <div className="search-area">
      <SearchBar
        showAutocomplete={props.showAutocomplete}
        handleSearchInputChange={props.handleSearchInputChange}
        inputValue={props.inputValue}
        searchResults={props.searchResults}
        handleIngredientClick={props.handleIngredientClick}
        handleClearSearch={props.handleClearSearch}
        handleCloseSearch={props.handleCloseSearch}
      />
      {props.searchValue && props.showFoodCard ? (
        <FoodCard
          mealType={props.mealType}
          ingredientInfo={props.ingredientInfo}
          macros={props.macros}
          searchValue={props.searchValue}
          unit={props.unit}
          handleUnitChange={props.handleUnitChange}
          searchResults={props.searchResults}
          quantity={props.quantity}
          handleQuantityChange={props.handleQuantityChange}
          fetchInProgess={props.fetchInProgess}
          handleAddFoodClick={props.handleAddFoodClick}
          handleCancelAddFoodClick={props.handleCancelAddFoodClick}
        />
      ) : null}
    </div>
  );
};

export default FoodSearchArea;
