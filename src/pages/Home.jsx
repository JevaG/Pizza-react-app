import React, {useContext, useEffect, useState} from 'react';

import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import { SearchContext } from "../search-context";

function Home() {
    const {searchValue, setSearchValue} = useContext(SearchContext)

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortId, setSortId] = useState({name: 'популярности', sortProperty:"rating" });

    const skeleton = [...new Array(6)].map((_, index) => (
        <Skeleton key={index} />
    ));
    // const pizzas = data.filter(pizzaName =>{
    //     pizzaName.toLowerCase().includes(data.toLowerCase())
    // })
    const categoryQuery = categoryId > 0 ? `category = ${categoryId}` : '';
// &sortBy=${sortId.sortProperty}&order=desc
    useEffect(() => {
        setIsLoading(true);
        console.log(categoryId, 'categoryId')
        fetch(`https://632a346c713d41bc8e6c260d.mockapi.io/items?${categoryQuery}`)
            .then((response) => response.json())
            .then((response) => {
                setData(response);
                setIsLoading(false);
            })
            .catch(() => {
                setErrorMessage("Unable to fetch item list");
                setIsLoading(true);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortId,categoryQuery]);


    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategories={(i) => {setCategoryId(i)}} />
                <Sort value={sortId} onClickSort={(i)=>{setSortId(i)}}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                    ? [...new Array(6)].map((_, index) => (
                            <Skeleton key={index} />
                        ))
                    : data.map((pizzaItem) => (
                            <PizzaBlock key={pizzaItem.id} {...pizzaItem} />
                        ))
                }
            </div>
        </div>
    );
}

export default Home;