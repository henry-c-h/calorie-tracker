import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Diary from './components/Diary';
import Goal from './components/Goal';

function App() {
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
