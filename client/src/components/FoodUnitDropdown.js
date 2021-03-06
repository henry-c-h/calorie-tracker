const FoodUnitDropdown = (props) => {
  return (
    <select
      name="food-unit"
      id="food-unit"
      value={props.unit}
      required
      onChange={props.handleUnitChange}
    >
      <option value="">-- please choose a unit --</option>
      {props.ingredientInfo.possibleUnits.map((unit, idx) => (
        <option key={idx} value={unit}>
          {unit}
        </option>
      ))}
    </select>
  );
};

export default FoodUnitDropdown;
