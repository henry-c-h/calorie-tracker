import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateGoalsAsync,
  resetGoalsAsync,
  selectGoals,
  selectGoalUpdateStatus,
  selectGoalFetchStatus,
} from '../features/goalSlice';
import { convertRatioToGrams } from '../utils';

const Goal = () => {
  const goals = useSelector(selectGoals);
  const goalUpdateStatus = useSelector(selectGoalUpdateStatus);
  const goalFetchStatus = useSelector(selectGoalFetchStatus);
  const [calorieGoal, setCalorieGoal] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setCalorieGoal(goals.calorieGoal);
    setProtein(goals.protein);
    setCarbs(goals.carbs);
    setFat(goals.fat);
  }, [goals]);

  useEffect(() => {
    if (goalUpdateStatus === 'success') {
      setDisplayMessage(true);
      setTimeout(() => setDisplayMessage(false), 3000);
    }
  }, [goalUpdateStatus]);

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
    dispatch(
      updateGoalsAsync({ id: goals._id, calorieGoal, protein, carbs, fat })
    );
  }

  function handleResetClick() {
    dispatch(resetGoalsAsync(goals._id));
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
              value={goalFetchStatus === 'loading' ? '' : calorieGoal}
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
              value={goalFetchStatus === 'loading' ? '' : protein}
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
              value={goalFetchStatus === 'loading' ? '' : carbs}
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
              value={goalFetchStatus === 'loading' ? '' : fat}
              onChange={handleRatioChange}
            />
            <p>{`${fat}%`}</p>
            <p>{`${convertRatioToGrams('fat', fat, calorieGoal)}g`}</p>
          </div>
          {!isValidRatio() && goalFetchStatus !== 'loading' ? (
            <div className="goal-form-row goal-message">
              ⚠️ Macronutrients must sum up to 100%
            </div>
          ) : null}
          {goalUpdateStatus === 'success' && displayMessage ? (
            <div className="goal-form-row goal-message">Success!</div>
          ) : null}
          <div className="goal-form-row">
            <button
              type="submit"
              disabled={
                !isValidRatio() ||
                (goals.calorieGoal === calorieGoal &&
                  goals.protein === protein &&
                  goals.carbs === carbs &&
                  goals.fat === fat)
              }
            >
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
