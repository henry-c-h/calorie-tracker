import Summary from './Summary';
import Meal from './Meal';

const Diary = () => {
  return (
    <>
      <Summary />
      <Meal mealType="breakfast" titleText="Breakfast 🥐" />
      <Meal mealType="lunch" titleText="Lunch 🍱" />
      <Meal mealType="dinner" titleText="Dinner 🍛" />
      <Meal mealType="snacks" titleText="Snacks 🍩" />
    </>
  );
};

export default Diary;
