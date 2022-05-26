import SearchBar from './SearchBar';
import FoodCard from './FoodCard';
import { useState } from 'react';

const FoodSearchArea = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [currentItem, setCurrentItem] = useState(null);

  function handleSearchResultClick(id, name) {
    setInputValue('');
    setCurrentItem({ name: name, id: id });
  }

  return (
    <div className="search-area">
      <SearchBar
        inputValue={inputValue}
        setInputValue={setInputValue}
        setCurrentItem={setCurrentItem}
        handleSearchResultClick={handleSearchResultClick}
        handleCloseSearchClick={props.handleCloseSearchClick}
      />
      {currentItem ? (
        <FoodCard
          mealType={props.mealType}
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
          handleAddFoodClick={props.handleAddFoodClick}
        />
      ) : null}
    </div>
  );
};

export default FoodSearchArea;
