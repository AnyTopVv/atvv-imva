import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from './features/counter/counterSlice';
import isLoginReducer from './features/isLogin/isLoginSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    isLogin: isLoginReducer,
  },
})

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;