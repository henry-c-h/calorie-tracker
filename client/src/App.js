import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Diary from './components/Diary';
import Goal from './components/Goal';
import Login from './components/Login';
import Register from './components/Register';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAsync, selectUser } from './features/userSlice';
import { fetchGoalsAsync } from './features/goalSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchUserAsync()).then(() => dispatch(fetchGoalsAsync(user)));
  }, [dispatch, user]);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          user === false ? (
            <Login />
          ) : user === null ? null : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/register"
        element={
          user === false ? (
            <Register />
          ) : user === null ? null : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/"
        element={
          user === false ? (
            <Navigate to="/login" />
          ) : user === null ? null : (
            <Navbar />
          )
        }
      >
        <Route
          index
          element={
            user === false ? (
              <Navigate to="/login" />
            ) : user === null ? null : (
              <Diary />
            )
          }
        />
        <Route
          path="my-goals"
          element={
            user === false ? (
              <Navigate to="/login" />
            ) : user === null ? null : (
              <Goal />
            )
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
