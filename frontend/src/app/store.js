import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import FilterChipReducer from '../features/FilterChip/FilterChipSlice';
import DataUpdateReducer from '../features/DataUpdate/DataUpdateSlice';
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        filterChipValue: FilterChipReducer,
        dataUpdate: DataUpdateReducer
    },
})
