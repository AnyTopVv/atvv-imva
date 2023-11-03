import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { userState } from './type';

// 使用该类型定义初始 state
const initialState: userState = {
  username: JSON.parse(localStorage.getItem('user') || '{}').username,
  avatar: JSON.parse(localStorage.getItem('user') || '{}').avatar,
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,
  reducers: {
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    setUser: (state, action: PayloadAction<userState>) => {
      state.username = action.payload.username
      state.avatar = action.payload.avatar
    }
  },
})

export const { setUser } = userSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUsername = (state: RootState) => state.user.username;
export const selectUserAvatar = (state: RootState) => state.user.avatar;

export default userSlice.reducer