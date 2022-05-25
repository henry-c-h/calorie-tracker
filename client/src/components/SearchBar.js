import AutocompleteBox from './AutocompleteBox';

const SearchBar = (props) => {
  return (
    <div className="search-bar">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for food here..."
          onChange={props.handleSearchInputChange}
          value={props.inputValue}
        />
        {props.showAutocomplete && props.inputValue ? (
          <AutocompleteBox
            resultList={props.searchResults.results}
            handleIngredientClick={props.handleIngredientClick}
          />
        ) : null}
      </div>
      <button onClick={props.handleClearSearch}>Clear search</button>
      <button onClick={props.handleCloseSearch}>Close search</button>
    </div>
  );
};

export default SearchBar;
