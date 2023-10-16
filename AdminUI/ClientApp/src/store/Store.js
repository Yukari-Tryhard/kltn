import { configureStore } from '@reduxjs/toolkit';

import accessTokenReducer from './AccessTokenSlice';
import headerSlice from './common/HeaderSlice';
import modalSlice from './common/ModalSlice';
import rightDrawerSlice from './common/RightDrawerSlice';

const combinedReducer = {
	header: headerSlice,
	rightDrawer: rightDrawerSlice,
	modal: modalSlice,
	accessToken: accessTokenReducer
};

export const store = configureStore({
	reducer: combinedReducer
});
