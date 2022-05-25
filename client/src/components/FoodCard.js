import DonutChart from './DonutChart';
import FoodForm from './FoodForm';

const FoodCard = (props) => {
  return (
    <div className="food-card">
      <DonutChart
        labelList={['protein', 'carbs', 'fat']}
        dataList={props.ingredientInfo.nutrition.nutrients
          .filter((nutrient) => props.macros.includes(nutrient.name))
          .sort(
            (a, b) =>
              props.macros.indexOf(a.name) - props.macros.indexOf(b.name)
          )
          .map((macro) => macro.amount)}
        text="nutrition profile"
      />
      <FoodForm
        mealType={props.mealType}
        searchValue={props.searchValue}
        unit={props.unit}
        handleUnitChange={props.handleUnitChange}
        searchResults={props.searchResults}
        quantity={props.quantity}
        handleQuantityChange={props.handleQuantityChange}
        ingredientInfo={props.ingredientInfo}
        fetchInProgess={props.fetchInProgess}
        handleAddFoodClick={props.handleAddFoodClick}
        handleCancelAddFoodClick={props.handleCancelAddFoodClick}
      />
    </div>
  );
};

export default FoodCard;
