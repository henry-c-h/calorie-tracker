import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import Summary from './Summary';
import Meal from './Meal';
import DateBar from './DateBar';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFoodList,
  selectFoodListStatus,
  fetchFoodListAsync,
} from '../features/foodListSlice';

const Diary = () => {
  const today = DateTime.now();
  const [currentDate, setCurrentDate] = useState(today);
  const dispatch = useDispatch();
  const foodList = useSelector(selectFoodList).filter(
    (food) =>
      food.dateConsumed.slice(0, 10) === currentDate.toISO().slice(0, 10)
  );
  const foodListStatus = useSelector(selectFoodListStatus);

  useEffect(() => {
    if (foodListStatus === 'idle') {
      dispatch(fetchFoodListAsync());
    }
  }, [foodListStatus, dispatch]);

  return (
    <>
      <DateBar currentDate={currentDate} setCurrentDate={setCurrentDate} />
      {foodList.length > 0 ? <Summary currentDate={currentDate} /> : null}
      <Meal
        mealType="breakfast"
        titleText="Breakfast 🥐"
        currentDate={currentDate}
      />
      {/* <Meal mealType="lunch" titleText="Lunch 🍱" currentDate={currentDate} />
      <Meal mealType="dinner" titleText="Dinner 🍛" currentDate={currentDate} />
      <Meal mealType="snacks" titleText="Snacks 🍩" currentDate={currentDate} /> */}
    </>
  );
};

export default Diary;
