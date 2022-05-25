const FoodTable = (props) => {
  const foodList = props.foodList.map((food, idx) => {
    return (
      <tr className="food-row" key={idx}>
        <td>{food.food}</td>
        <td>{food.unit}</td>
        <td>{food.quantity}</td>
        <td>{food.protein}</td>
        <td>{food.carbs}</td>
        <td>{food.fat}</td>
        <td>{food.totalCalories}</td>
        <td>
          <img
            onClick={() => props.handleDeleteFood(food.id)}
            src="./assets/delete-icon.svg"
            alt="delete icon"
          />
        </td>
      </tr>
    );
  });

  return props.foodList.length > 0 ? (
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
      <tbody>{foodList}</tbody>
    </table>
  ) : null;
};

export default FoodTable;
