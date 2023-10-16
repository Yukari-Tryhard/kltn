import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: window.localStorage.getItem('AccessToken')
};

export const accessTokenSlice = createSlice({
	name: 'accessToken',
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.value = action.payload;
		}
	}
});

// Action creators are generated for each case reducer function
export const { setToken } = accessTokenSlice.actions;

export default accessTokenSlice.reducer;
