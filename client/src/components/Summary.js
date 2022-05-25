import ProgressCircle from './ProgressCircle';

const Summary = (props) => {
  return (
    <div className="summary-container">
      <div className="summary">
        <div className="progress-container">
          <ProgressCircle
            consumedRatio={props.consumedRatio}
            progressCircleText="800kcal remaining"
            strokeColor="#DE7A6C"
          />
          <p>my day ⚡️</p>
        </div>
        <div className="progress-container">
          <ProgressCircle
            consumedRatio={props.proteinRatio}
            progressCircleText="x% protein consumed"
            strokeColor="#749296"
          />
          <p>protein 🍳</p>
        </div>
        <div className="progress-container">
          <ProgressCircle
            consumedRatio={props.carbsRatio}
            progressCircleText="x% carbs consumed"
            strokeColor="#936F61"
          />
          <p>carbohydrates 🍞</p>
        </div>
        <div className="progress-container">
          <ProgressCircle
            consumedRatio={props.fatRatio}
            progressCircleText="x% fat consumed"
            strokeColor="#E4B538"
          />
          <p>fat 🥑</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
