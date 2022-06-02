import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateGoals, resetGoals, selectGoals } from '../features/goalSlice';
import { convertRatioToGrams } from '../utils';

const Goal = () => {
  const goals = useSelector(selectGoals);
  const [calorieGoal, setCalorieGoal] = useState(goals.calorieGoal);
  const [protein, setProtein] = useState(goals.protein);
  const [carbs, setCarbs] = useState(goals.carbs);
  const [fat, setFat] = useState(goals.fat);

  const dispatch = useDispatch();

  const isValidRatio = () => protein + carbs + fat === 100;

  function handleRatioChange(e) {
    if (e.target.name === 'protein') {
      setProtein(parseInt(e.target.value));
    } else if (e.target.name === 'carbs') {
      setCarbs(parseInt(e.target.value));
    } else if (e.target.name === 'fat') {
      setFat(parseInt(e.target.value));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newGoals = {
      calorieGoal: calorieGoal,
      protein: protein,
      carbs: carbs,
      fat: fat,
      proteinInGrams: convertRatioToGrams('protein', protein, calorieGoal),
      carbsInGrams: convertRatioToGrams('carbs', carbs, calorieGoal),
      fatInGrams: convertRatioToGrams('fat', fat, calorieGoal),
    };
    dispatch(updateGoals(newGoals));
  }

  function handleResetClick() {
    setCalorieGoal(2000);
    setProtein(35);
    setCarbs(40);
    setFat(25);
    dispatch(resetGoals());
  }

  return (
    <div className="goal-container">
      <div className="goal">
        <div className="goal-title">My Goals 📈</div>
        <form className="goal-form" onSubmit={handleSubmit}>
          <div className="goal-form-row">
            <label htmlFor="calorie-goal">Daily calorie target</label>
            <input
              type="number"
              value={calorieGoal}
              onChange={(e) => setCalorieGoal(e.target.value)}
              required
            />
            kcal
          </div>
          <div className="goal-form-row">
            <label htmlFor="protein">Protein 🍳</label>
            <input
              type="range"
              name="protein"
              id="protein"
              min="1"
              max="100"
              value={protein}
              onChange={handleRatioChange}
            />
            <p>{`${protein}%`}</p>
            <p>{`${convertRatioToGrams('protein', protein, calorieGoal)}g`}</p>
          </div>
          <div className="goal-form-row">
            <label htmlFor="carbs">Carbohydrates 🍞</label>
            <input
              type="range"
              name="carbs"
              id="carbs"
              min="1"
              max="100"
              value={carbs}
              onChange={handleRatioChange}
            />
            <p>{`${carbs}%`}</p>
            <p>{`${convertRatioToGrams('carbs', carbs, calorieGoal)}g`}</p>
          </div>
          <div className="goal-form-row">
            <label htmlFor="fat">Fat 🥑</label>
            <input
              type="range"
              name="fat"
              id="fat"
              min="1"
              max="100"
              value={fat}
              onChange={handleRatioChange}
            />
            <p>{`${fat}%`}</p>
            <p>{`${convertRatioToGrams('fat', fat, calorieGoal)}g`}</p>
          </div>
          {!isValidRatio() ? (
            <div className="goal-form-row goal-message">
              ⚠️ Macronutrients must sum up to 100%
            </div>
          ) : null}
          <div className="goal-form-row">
            <button type="submit" disabled={!isValidRatio()}>
              Update goals
            </button>
            <button type="button" onClick={handleResetClick}>
              Reset goals
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Goal;
