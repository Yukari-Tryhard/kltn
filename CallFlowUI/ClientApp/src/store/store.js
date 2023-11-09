import { configureStore } from '@reduxjs/toolkit'
import accessTokenReducer from './accessTokenSlice'


export const store = configureStore({
  reducer: {
    accessToken: accessTokenReducer
  },
})