import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Diary from './components/Diary';
import Goal from './components/Goal';
import { fetchGoalsAsync } from './features/goalSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGoalsAsync());
  }, [dispatch]);

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route index element={<Diary />} />
        <Route path="my-goals" element={<Goal />} />
      </Routes>
    </div>
  );
}

export default App;
