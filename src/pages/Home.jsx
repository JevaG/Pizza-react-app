import React, {useEffect, useState} from 'react';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/Skeleton";
import PizzaBlock from "../components/PizzaBlock";

function Home() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(true);

    useEffect(() => {
        fetch("https://632a346c713d41bc8e6c260d.mockapi.io/items")
            .then((response) => response.json())
            .then((response) => {
                setData(response);
                setIsLoading(false);
            })
            .catch(() => {
                setErrorMessage("Unable to fetch item list");
                setIsLoading(true);
            });
    }, []);
    return (
        <>
            <div className="container">
                <div className="content__top">
                    <Categories />
                    <Sort />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                    {isLoading
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                        : data.map((pizzaItem) => (
                            <PizzaBlock key={pizzaItem.id} {...pizzaItem} />
                        ))}
                </div>
            </div>
        </>
    );
}

export default Home;