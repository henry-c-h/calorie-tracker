import './App.css';
import Navbar from './components/Navbar';
import Summary from './components/Summary';
import Meal from './components/Meal';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Summary
        consumedRatio={0.6}
        proteinRatio={0.3}
        carbsRatio={0.8}
        fatRatio={0.5}
      />
      <Meal mealType="breakfast" titleText="Breakfast 🥐" />
      <Meal mealType="lunch" titleText="Lunch 🍱" />
      <Meal mealType="dinner" titleText="Dinner 🍛" />
      <Meal mealType="snacks" titleText="Snacks 🍩" />
    </div>
  );
}

export default App;
