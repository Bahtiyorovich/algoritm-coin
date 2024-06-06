import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../feature/user/authSlice'
import getUserSlice from '../feature/user/getUserSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    user: getUserSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
})