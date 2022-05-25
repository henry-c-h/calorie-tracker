const AutocompleteBox = (props) => {
  const suggestions = props.resultList.map((result) => {
    return (
      <div
        key={result.id}
        // id={result.id}
        onClick={() => props.handleIngredientClick(result.id)}
      >
        {result.name}
      </div>
    );
  });

  return <div className="suggestion-box">{suggestions}</div>;
};

export default AutocompleteBox;
