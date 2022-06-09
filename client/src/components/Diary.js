import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import Summary from './Summary';
import Meal from './Meal';
import DateBar from './DateBar';
import { useSelector, useDispatch } from 'react-redux';
import { selectFoodList, fetchFoodListAsync } from '../features/foodListSlice';
import { selectUser } from '../features/userSlice';
import { fetchGoalsAsync } from '../features/goalSlice';

const Diary = () => {
  const today = DateTime.now();
  const [currentDate, setCurrentDate] = useState(today);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const foodList = useSelector(selectFoodList).filter(
    (food) =>
      food.dateConsumed.slice(0, 10) === currentDate.toISO().slice(0, 10)
  );

  useEffect(() => {
    dispatch(fetchFoodListAsync(user));
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(fetchGoalsAsync(user));
  }, [dispatch, user]);

  return (
    <>
      <DateBar currentDate={currentDate} setCurrentDate={setCurrentDate} />
      {foodList.length > 0 ? <Summary currentDate={currentDate} /> : null}
      <Meal
        mealType="breakfast"
        titleText="Breakfast 🥐"
        currentDate={currentDate}
        backgroundImage="./assets/breakfast.jpg"
      />
      <Meal
        mealType="lunch"
        titleText="Lunch 🍱"
        currentDate={currentDate}
        backgroundImage="./assets/lunch.jpg"
      />
      <Meal
        mealType="dinner"
        titleText="Dinner 🍛"
        currentDate={currentDate}
        backgroundImage="./assets/dinner.jpg"
      />
      <Meal
        mealType="snacks"
        titleText="Snacks 🍩"
        currentDate={currentDate}
        backgroundImage="./assets/snacks.jpg"
      />
    </>
  );
};

export default Diary;
