import ProgressCircle from './ProgressCircle';
import { sumMacros } from '../utils';
import { useSelector } from 'react-redux';
import { selectFoodList } from '../features/foodListSlice';
import { selectGoals } from '../features/goalSlice';

const Summary = (props) => {
  const foodList = useSelector(selectFoodList).filter(
    (food) =>
      food.dateConsumed.slice(0, 10) === props.currentDate.toISO().slice(0, 10)
  );
  const goals = useSelector(selectGoals);

  const consumedCalories = Math.floor(sumMacros(foodList, 'totalCalories'));
  const consumedRatio = consumedCalories / goals.calorieGoal;
  const remainingCalories = Math.floor(goals.calorieGoal - consumedCalories);

  const consumedProtein = Math.floor(sumMacros(foodList, 'protein'));
  const consumedProteinRatio = consumedProtein / goals.proteinInGrams;
  const consumedCarbs = Math.floor(sumMacros(foodList, 'carbs'));
  const consumedCarbsRatio = consumedCarbs / goals.carbsInGrams;
  const consumedFat = Math.floor(sumMacros(foodList, 'fat'));
  const consumedFatRatio = consumedFat / goals.fatInGrams;

  return (
    <div className="summary-container">
      <div className="summary">
        <div className="progress-container">
          <ProgressCircle
            consumedRatio={consumedRatio}
            progressCircleText={
              remainingCalories >= 0
                ? `${remainingCalories} kcal remaining`
                : `${-remainingCalories} kcal overconsumed`
            }
            strokeColor="#DE7A6C"
          />
          <p>my day ⚡️</p>
        </div>
        <div className="progress-container">
          <ProgressCircle
            consumedRatio={consumedProteinRatio}
            progressCircleText={`${consumedProtein}g / ${goals.proteinInGrams}g consumed`}
            strokeColor="#749296"
          />
          <p>protein 🍳</p>
        </div>
        <div className="progress-container">
          <ProgressCircle
            consumedRatio={consumedCarbsRatio}
            progressCircleText={`${consumedCarbs}g / ${goals.carbsInGrams}g consumed`}
            strokeColor="#936F61"
          />
          <p>carbohydrates 🍞</p>
        </div>
        <div className="progress-container">
          <ProgressCircle
            consumedRatio={consumedFatRatio}
            progressCircleText={`${consumedFat}g / ${goals.fatInGrams}g consumed`}
            strokeColor="#E4B538"
          />
          <p>fat 🥑</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
