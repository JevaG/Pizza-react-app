import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categoryId: 0,
    pageCount: 1,
    sortId: {
        name: 'популярности',
        sortProperty:"rating"
    }
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId (state, action) {
            state.categoryId = action.payload
        },
        setPageCount(state, action) {
            state.pageCount = action.payload
        },
        setSortId (state, action) {
            state.sortId = action.payload
        },
        setFilters (state, action) {
            state.categoryId = Number(action.payload.categoryId);
            state.sortId = action.payload.sortId;
            state.pageCount = Number(action.payload.pageCount);

        }
    },
})

export const { setCategoryId, setSortId, setPageCount, setFilters } = filterSlice.actions;

export default filterSlice.reducer;