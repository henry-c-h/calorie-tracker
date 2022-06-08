import { useState } from 'react';
import SearchResultBox from './SearchResultBox';

const SearchBar = (props) => {
  const [searchStatus, setSearchStatus] = useState({
    showSearchBegin: false,
    searchResultList: [],
  });

  function handleSearchInputChange(e) {
    props.setInputValue(e.target.value);
    props.setCurrentItem(null);

    if (e.target.value) {
      setSearchStatus({ showSearchBegin: true });
      fetch(
        `https://calorie-logging-app.herokuapp.com/api/diary/search/${e.target.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSearchStatus({ showSearchBegin: false, searchResultList: data });
        });
    }
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
            searchResultList={searchStatus.searchResultList}
            showSearchBegin={searchStatus.showSearchBegin}
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
