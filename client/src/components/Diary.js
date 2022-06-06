import { useEffect } from 'react';
import Summary from './Summary';
import Meal from './Meal';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFoodList,
  selectFoodListStatus,
  fetchFoodListAsync,
} from '../features/foodListSlice';

const Diary = () => {
  const dispatch = useDispatch();
  const foodList = useSelector(selectFoodList);
  const foodListStatus = useSelector(selectFoodListStatus);

  useEffect(() => {
    if (foodListStatus === 'idle') {
      dispatch(fetchFoodListAsync());
    }
  }, [foodListStatus, dispatch]);

  return (
    <>
      {foodList.length > 0 ? <Summary /> : null}
      <Meal mealType="breakfast" titleText="Breakfast 🥐" />
      <Meal mealType="lunch" titleText="Lunch 🍱" />
      <Meal mealType="dinner" titleText="Dinner 🍛" />
      <Meal mealType="snacks" titleText="Snacks 🍩" />
    </>
  );
};

export default Diary;
