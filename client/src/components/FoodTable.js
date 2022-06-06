import { useDispatch, useSelector } from 'react-redux';
import {
  removeFoodItemAsync,
  increaseItemQuantityAsync,
  decreaseItemQuantityAsync,
} from '../features/foodListSlice';
import { selectFoodList } from '../features/foodListSlice';

const FoodTable = (props) => {
  const dispatch = useDispatch();
  const foodList = useSelector(selectFoodList).filter(
    (food) =>
      food.mealType === props.mealType &&
      food.dateConsumed.slice(0, 10) === props.currentDate.toISO().slice(0, 10)
  );

  function handleRemoveFoodItem(id) {
    dispatch(removeFoodItemAsync(id));
  }

  function handleIncreaseQuantity(food) {
    dispatch(increaseItemQuantityAsync(food));
  }

  function handleDecreaseQuantity(food) {
    if (food.quantity > 1) {
      dispatch(decreaseItemQuantityAsync(food));
    }
  }

  const foodItems = foodList.map((food, idx) => {
    return (
      <tr className="food-row" key={idx}>
        <td>{food.foodName}</td>
        <td>{food.unit}</td>
        <td>
          {food.quantity}
          <div className="quantity-change-buttons">
            <img
              src="./assets/plus-sign.svg"
              onClick={() => handleIncreaseQuantity(food)}
              alt="plus icon"
            />
            <img
              src="./assets/minus-sign.svg"
              onClick={() => handleDecreaseQuantity(food)}
              alt="minus icon"
            />
          </div>
        </td>
        <td>{Math.floor(food.protein)}</td>
        <td>{Math.floor(food.carbs)}</td>
        <td>{Math.floor(food.fat)}</td>
        <td>{Math.floor(food.totalCalories)}</td>
        <td>
          <img
            onClick={() => handleRemoveFoodItem(food._id)}
            src="./assets/delete-icon.svg"
            alt="delete icon"
          />
        </td>
      </tr>
    );
  });

  return foodList.length > 0 ? (
    <table className="food-table">
      <thead>
        <tr>
          <th>Food</th>
          <th>Unit</th>
          <th>Quantity</th>
          <th>Protein(g)</th>
          <th>Carbs(g)</th>
          <th>Fat(g)</th>
          <th>Total calories</th>
        </tr>
      </thead>
      <tbody>{foodItems}</tbody>
    </table>
  ) : null;
};

export default FoodTable;
