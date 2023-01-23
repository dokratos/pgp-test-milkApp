import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import ProductList from './components/ProductList';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<ProductList />}/>
        <Route />
      </Routes>
    </Router>
  );
}

export default App;
