import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { isLoginState } from './type';

// 使用该类型定义初始 state
const initialState: isLoginState = {
  status: !!localStorage.getItem('access_token')
}

export const isLoginSlice = createSlice({
  name: 'isLogin',
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload
    }
  },
})

export const { setIsLogin } = isLoginSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectIsLogin = (state: RootState) => state.isLogin.status;

export default isLoginSlice.reducer