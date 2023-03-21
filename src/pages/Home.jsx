import React, {useContext, useEffect, useState} from 'react';

import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";


import { SearchContext } from "../search-context";

function Home() {
    const {searchValue} = useContext(SearchContext)

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryId, setCategoryId] = useState(0);
    const [sortId, setSortId] = useState({name: 'популярности', sortProperty:"rating" });

    const skeleton = [...new Array(6)].map((_, index) => (
        <Skeleton key={index} />
    ));
    const pizzas = data
    //     .filter( pizzaName => {
    //     if(pizzaName.title.toLowerCase().includes(searchValue.toLowerCase())){
    //         return true
    //     }
    //         return false
    // })
        .map((pizzaItem) => (
            <PizzaBlock key={pizzaItem.id} {...pizzaItem} />
        ))
    const categoryQuery = categoryId > 0 ? `&category = ${categoryId}` : '';
// &sortBy=${sortId.sortProperty}&order=desc

    const search = searchValue ? `&search = ${searchValue}` : '';

    useEffect(() => {
        setIsLoading(true);
        console.log(categoryId, 'categoryId')
        fetch(`https://632a346c713d41bc8e6c260d.mockapi.io/items?page=${currentPage}&limit=4${categoryQuery}${search}`)
            .then((response) => response.json())
            .then((response) => {
                setData(response);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(true);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortId, searchValue, currentPage]);


    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategories={(i) => {setCategoryId(i)}} />
                <Sort value={sortId} onClickSort={(i)=>{setSortId(i)}}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? skeleton : pizzas
                }
            </div>
            <Pagination onChangePage={(num) => setCurrentPage(num)} />
        </div>
    );
}

export default Home;




