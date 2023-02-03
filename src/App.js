import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import Skeleton from "./components/Skeleton";

import "./scss/app.scss";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://632a346c713d41bc8e6c260d.mockapi.io/items`
      );
      const newData = await response.json();
      setData(newData);
    };

    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {data.map((pizzaItem) => (
              <PizzaBlock key={pizzaItem.id} {...pizzaItem} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
