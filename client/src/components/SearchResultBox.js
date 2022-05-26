const SearchResultBox = (props) => {
  if (props.showSearchBegin) {
    return (
      <div className="suggestion-box">
        <div>Searching...</div>
      </div>
    );
  } else if (props.searchResultList.length > 0) {
    const suggestions = props.searchResultList.map((result) => {
      return (
        <div
          key={result.id}
          onClick={() => props.handleSearchResultClick(result.id, result.name)}
        >
          {result.name}
        </div>
      );
    });
    return <div className="suggestion-box">{suggestions}</div>;
  }
  return (
    <div className="suggestion-box">
      <div>No result found. Try a different search.</div>
    </div>
  );
};

export default SearchResultBox;
