import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = (props) => {
  // function sumMacros(foodList, macroType) {
  //   const macroList = foodList.map((food) => food[macroType]);
  //   return macroList.reduce((prev, current) => prev + current);
  // }

  // const protein = sumMacros(props.data, 'protein');
  // const carbs = sumMacros(props.data, 'carbs');
  // const fat = sumMacros(props.data, 'fat');

  const data = {
    // labels: ['protein', 'carbs', 'fat'],
    labels: props.labelList,
    datasets: [
      {
        // label: 'meal macros',
        // data: [protein, carbs, fat],
        data: props.dataList,
        backgroundColor: ['#749296', '#936F61', '#E4B538'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="chart-wrapper">
      <Doughnut
        className="donut-chart"
        data={data}
        options={{
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 10,
                font: { size: 18, family: 'Ubuntu' },
                boxWidth: 20,
                color: '#f3f5f7',
              },
            },
            tooltip: {
              bodyFont: { family: 'Ubuntu' },
              callbacks: {
                label: function (context) {
                  const total = context.dataset.data.reduce(
                    (prev, curr) => prev + curr
                  );
                  const text = `${context.label}: ${Math.floor(
                    (context.raw / total) * 100
                  )} %`;
                  return text;
                },
              },
            },
          },
          animation: {
            duration: 2000,
          },
        }}
      />
      <p>{props.text}</p>
    </div>
  );
};

export default DonutChart;
