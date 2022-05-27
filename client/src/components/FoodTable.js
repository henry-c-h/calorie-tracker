import { useDispatch, useSelector } from 'react-redux';
import {
  removeFoodItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} from '../features/foodListSlice';
import { selectFoodList } from '../features/foodListSlice';

const FoodTable = (props) => {
  const dispatch = useDispatch();
  const foodList = useSelector(selectFoodList).filter(
    (food) => food.mealType === props.mealType
  );

  function handleRemoveFoodItem(id) {
    dispatch(removeFoodItem(id));
  }

  function handleIncreaseQuantity(id) {
    dispatch(increaseItemQuantity(id));
  }

  function handleDecreaseQuantity(id) {
    dispatch(decreaseItemQuantity(id));
  }

  const foodItems = foodList.map((food, idx) => {
    return (
      <tr className="food-row" key={idx}>
        <td>{food.food}</td>
        <td>{food.unit}</td>
        <td>
          {food.quantity}
          <div className="quantity-change-buttons">
            <img
              src="./assets/plus-sign.svg"
              onClick={() => handleIncreaseQuantity(food.id)}
              alt="plus icon"
            />
            <img
              src="./assets/minus-sign.svg"
              onClick={() => handleDecreaseQuantity(food.id)}
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
            onClick={() => handleRemoveFoodItem(food.id)}
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
