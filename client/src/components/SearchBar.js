import { useState } from 'react';
import searchResults from '../autocomplete.json';
import SearchResultBox from './SearchResultBox';

const SearchBar = (props) => {
  const [showSearchBegin, setShowSearchBegin] = useState(false);
  const [searchResultList, setRearchResultList] = useState([]);

  function handleSearchInputChange(e) {
    props.setInputValue(e.target.value);
    props.setCurrentItem(null);
    setShowSearchBegin(true);
    setTimeout(() => {
      setRearchResultList(searchResults.results);
      // setRearchResultList([]);
      setShowSearchBegin(false);
    }, 1000);
  }

  function handleClearSearch() {
    props.setInputValue('');
  }

  return (
    <div className="search-bar">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for food here..."
          onChange={handleSearchInputChange}
          value={props.inputValue}
        />
        {props.inputValue ? (
          <SearchResultBox
            searchResultList={searchResultList}
            showSearchBegin={showSearchBegin}
            handleSearchResultClick={props.handleSearchResultClick}
          />
        ) : null}
      </div>
      <button onClick={handleClearSearch}>Clear search</button>
      <button onClick={props.handleCloseSearchClick}>Close search</button>
    </div>
  );
};

export default SearchBar;
