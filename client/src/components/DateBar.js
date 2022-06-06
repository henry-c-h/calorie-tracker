// import { useState } from 'react';
import { DateTime } from 'luxon';

const DateBar = (props) => {
  const today = DateTime.now();
  // const [currentDate, setCurrentDate] = useState(today);

  function handlePreviousDayClick() {
    const newDate = props.currentDate.set({ days: props.currentDate.day - 1 });
    props.setCurrentDate(newDate);
  }

  function handleNextDayClick() {
    const newDate = props.currentDate.set({ days: props.currentDate.day + 1 });
    props.setCurrentDate(newDate);
  }

  return (
    <div className="date-bar-container">
      <div className="date-bar">
        <p onClick={handlePreviousDayClick}>&lt;&lt; Previous Day</p>
        {today.day === props.currentDate.day &&
        today.month === props.currentDate.month &&
        today.year === props.currentDate.year ? (
          <p>today</p>
        ) : (
          <p>{props.currentDate.toISO().slice(0, 10)}</p>
        )}
        <p onClick={handleNextDayClick}>Next Day &gt;&gt;</p>
      </div>
    </div>
  );
};

export default DateBar;
