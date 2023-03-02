import React, { useEffect, useState } from "react";
import {Route, Routes} from 'react-router-dom';
import Header from "./components/Header/Header";
import Home from './pages/Home'
import Cart from './pages/Cart'

import "./scss/app.scss";
import NotFound from "./pages/NotFound";

import { SearchContext } from "./search-context";

function App() {
    const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path='*' element={<NotFound />} />
            </Routes>;
            </div>
        </SearchContext.Provider>
    </div>
  );
}

export default App;
