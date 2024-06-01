import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
}

export const DataUpdaterSlice = createSlice({
    name: 'DataUpdater',
    initialState,
    reducers: {
/**
 * Toggles the value of the state between 0 and 1.
 *
 * @param {object} state - The state object to be updated.
 * @return {void} This function does not return a value.
 */
updater: (state) => {
    // Toggles the value of state between 0 and 1
    state.value === 0 ? state.value = 1 : state.value = 0
}
    },
})

export const { updater } = DataUpdaterSlice.actions;

export default DataUpdaterSlice.reducer;
