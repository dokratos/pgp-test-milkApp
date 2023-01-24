import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Landing from './components/Landing';
import MilkPage from './components/MilkPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/:id' element={<MilkPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
