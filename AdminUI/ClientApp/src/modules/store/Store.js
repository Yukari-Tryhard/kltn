import { configureStore } from '@reduxjs/toolkit';

import authSlice from './AuthSlice';
import headerSlice from './common/HeaderSlice';
import modalSlice from './common/ModalSlice';
import rightDrawerSlice from './common/RightDrawerSlice';

const combinedReducer = {
	authSlice: authSlice,
	header: headerSlice,
	rightDrawer: rightDrawerSlice,
	modal: modalSlice
};

export const store = configureStore({
	reducer: combinedReducer
});
