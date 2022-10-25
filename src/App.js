import Login from './Login';
import Register from './Register';
import './App.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route index element={<Register />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
