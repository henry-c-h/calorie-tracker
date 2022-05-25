const ProgressCircle = (props) => {
  const svgWidth = 200;
  const strokeWidth = 30;
  const radius = (svgWidth - strokeWidth) / 2;
  const circumference = Math.PI * 2 * radius;
  const consumed = props.consumedRatio * circumference;

  return (
    <div className="progress-circle">
      <svg width={svgWidth} height={svgWidth}>
        <circle
          className="progress-circle-foreground"
          cx={svgWidth / 2}
          cy={svgWidth / 2}
          r={radius}
          stroke={props.strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference}, ${circumference}`}
          strokeDashoffset={`${circumference - consumed}`}
        />
        <circle
          className="progress-circle-background"
          cx={svgWidth / 2}
          cy={svgWidth / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
      </svg>
      <p className="progress-circle-text">{props.progressCircleText}</p>
    </div>
  );
};

export default ProgressCircle;
