import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        tags: {},
        tools: {},
    },
}

export const FilterChipSlice = createSlice({
    name: "filterChipValue",
    initialState,
    reducers: {
        ToggleTagChip: (state, action) => {
            const value = { ...state.value.tags };
            // console.log(value);
            if (value.hasOwnProperty(action.payload[1])) {
                delete value[action.payload[1]];
            } else {
                value[action.payload[1]] = action.payload[0];
            }
            state.value.tags = value;
        },
        ToggleToolChip: (state, action) => {
            const value = { ...state.value.tools };
            if (value.hasOwnProperty(action.payload[1])) {
                delete value[action.payload[1]];
            } else {
                value[action.payload[1]] = action.payload[0];
            }
            state.value.tools = value;
        },
        ResetChip(state, { payload }) {
            state.value[payload] = {};
        },

    },
});

export const { ToggleTagChip, ToggleToolChip, ResetChip } = FilterChipSlice.actions;
export default FilterChipSlice.reducer;
