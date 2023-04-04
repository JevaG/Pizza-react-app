import React, {useContext, useEffect, useState,useRef} from 'react';
import axios from "axios";
import qs from 'qs';
import  { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from "../components/Categories/Categories";
import Sort, {sortList} from "../components/Sort";
import Skeleton from "../components/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";

import {setCategoryId, setPageCount, setFilters} from "../redux/slices/filterSlice";

import { SearchContext } from "../search-context";

function Home() {
    const isSearch = useRef(false);
    const isMounted = useRef(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {searchValue} = useContext(SearchContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const categoryId = useSelector((state) => state.filters.categoryId);
    const sortId = useSelector((state) => state.filters.sortId.sortProperty);
    const pageCount = useSelector((state) => state.filters.pageCount);


    const onChangePage = (num) => {
        dispatch(setPageCount(num))

    }

    const skeleton = [...new Array(6)].map((_, index) => (
        <Skeleton key={index} />
    ));

    const pizzas = data
        .map((pizzaItem) => (
            <PizzaBlock key={pizzaItem.id} {...pizzaItem} />
    ));

    const categoryQuery = categoryId > 0 ? `&category = ${categoryId}` : '';
// &sortBy=${sortId.sortProperty}&order=desc
    const search = searchValue ? `&search = ${searchValue}` : '';

    useEffect(() => {
        if(isMounted.current) {
            const queryString = qs.stringify({
                sortId,
                categoryId,
                pageCount
            })
            navigate(`?${queryString}`)
        }

        isMounted.current = true;
    },[sortId, categoryId, pageCount,navigate])

    useEffect(() => {
        if(window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = sortList.map((obj) => obj.sortProperty === params.sortProperty);

            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            );
            isSearch.current = true;
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);

        if(!isSearch.current) {
            setIsLoading(true);
            axios.get(`https://632a346c713d41bc8e6c260d.mockapi.io/items?page=${pageCount}&limit=4${categoryQuery}${search}`)
                .then((response) => {
                    setData(response.data);
                    setIsLoading(false);
                })
        }
        isSearch.current = false;

    }, [categoryId, sortId, searchValue, search]);


    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategories={(i) => dispatch(setCategoryId(i))} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? skeleton : pizzas
                }
            </div>
            <Pagination value={pageCount} onChangePage={onChangePage} />
        </div>
    );
}

export default Home;




