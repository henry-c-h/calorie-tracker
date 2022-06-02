export function sumMacros(foodList, macroType) {
  const macroList = foodList.map((food) => food[macroType]);
  return macroList.reduce((prev, current) => prev + current);
}

export function getUnitCalories(ingredientInfo) {
  return ingredientInfo.nutrition.nutrients.filter(
    (nutrient) => nutrient.name === 'Calories'
  )[0].amount;
}

export function getUnitMacro(macroType, ingredientInfo) {
  return ingredientInfo.nutrition.nutrients.filter(
    (nutrient) => nutrient.name === macroType
  )[0].amount;
}

export function calculateMacro(macroType, quantity, ingredientInfo) {
  return quantity * getUnitMacro(macroType, ingredientInfo);
}

export function convertRatioToGrams(macroType, macroRatio, calorieGoal) {
  if (macroType === 'fat') {
    return Math.floor(((macroRatio / 100) * calorieGoal) / 9);
  } else {
    return Math.floor(((macroRatio / 100) * calorieGoal) / 4);
  }
}
