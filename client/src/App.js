import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Diary from './components/Diary';
import Goal from './components/Goal';
import Login from './components/Login';
import Register from './components/Register';
import { fetchGoalsAsync } from './features/goalSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGoalsAsync());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navbar />}>
          <Route index element={<Diary />} />
          <Route path="my-goals" element={<Goal />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
