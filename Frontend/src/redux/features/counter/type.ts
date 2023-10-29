// 为 slice state 定义一个类型
export interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}