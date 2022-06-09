import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateGoalsAsync,
  fetchGoalsAsync,
  selectGoals,
  selectGoalUpdateStatus,
  selectGoalFetchStatus,
} from '../features/goalSlice';
import { selectUser } from '../features/userSlice';
import { convertRatioToGrams } from '../utils';

const Goal = () => {
  const user = useSelector(selectUser);
  const goals = useSelector(selectGoals);
  const goalUpdateStatus = useSelector(selectGoalUpdateStatus);
  const goalFetchStatus = useSelector(selectGoalFetchStatus);
  const [macros, setMacros] = useState({
    calorieGoal: '',
    protein: '',
    carbs: '',
    fat: '',
  });
  const [displayMessage, setDisplayMessage] = useState(false);
  const [isValidRatio, setIsValidRatio] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGoalsAsync(user)).then((action) => {
      setMacros({
        calorieGoal: action.payload.calorieGoal,
        protein: action.payload.protein,
        carbs: action.payload.carbs,
        fat: action.payload.fat,
      });
    });
  }, [dispatch, user]);

  useEffect(() => {
    if (macros.protein && macros.carbs && macros.fat)
      setIsValidRatio(macros.protein + macros.carbs + macros.fat === 100);
  }, [macros]);

  function handleRatioChange(e) {
    setMacros((prev) => ({
      ...prev,
      [e.target.name]: parseInt(e.target.value),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      updateGoalsAsync({
        id: goals._id,
        calorieGoal: macros.calorieGoal,
        protein: macros.protein,
        carbs: macros.carbs,
        fat: macros.fat,
      })
    ).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        setDisplayMessage(true);
        setTimeout(() => setDisplayMessage(false), 3000);
      }
    });
  }

  return (
    <div className="goal-container">
      <div className="goal">
        <div className="goal-title">My Goals 📈</div>
        {goalFetchStatus !== 'success' ? (
          <p className="goal-form">Loading...</p>
        ) : (
          <form className="goal-form" onSubmit={handleSubmit}>
            <div className="goal-form-row">
              <label htmlFor="calorie-goal">Daily calorie target</label>
              <input
                type="number"
                value={macros.calorieGoal}
                onChange={(e) =>
                  setMacros((prev) => ({
                    ...prev,
                    calorieGoal: parseInt(e.target.value),
                  }))
                }
                step={100}
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
                value={macros.protein}
                onChange={handleRatioChange}
              />
              <p>{`${macros.protein}%`}</p>
              <p>{`${convertRatioToGrams(
                'protein',
                macros.protein,
                macros.calorieGoal
              )}g`}</p>
            </div>
            <div className="goal-form-row">
              <label htmlFor="carbs">Carbohydrates 🍞</label>
              <input
                type="range"
                name="carbs"
                id="carbs"
                min="1"
                max="100"
                value={macros.carbs}
                onChange={handleRatioChange}
              />
              <p>{`${macros.carbs}%`}</p>
              <p>{`${convertRatioToGrams(
                'carbs',
                macros.carbs,
                macros.calorieGoal
              )}g`}</p>
            </div>
            <div className="goal-form-row">
              <label htmlFor="fat">Fat 🥑</label>
              <input
                type="range"
                name="fat"
                id="fat"
                min="1"
                max="100"
                value={macros.fat}
                onChange={handleRatioChange}
              />
              <p>{`${macros.fat}%`}</p>
              <p>{`${convertRatioToGrams(
                'fat',
                macros.fat,
                macros.calorieGoal
              )}g`}</p>
            </div>
            {!isValidRatio ? (
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
                  !isValidRatio ||
                  (goals.calorieGoal === parseInt(macros.calorieGoal) &&
                    goals.protein === parseInt(macros.protein) &&
                    goals.carbs === parseInt(macros.carbs) &&
                    goals.fat === parseInt(macros.fat))
                }
              >
                Update goals
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Goal;
