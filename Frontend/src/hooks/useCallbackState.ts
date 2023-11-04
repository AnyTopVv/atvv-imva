import { useEffect, useState, useRef } from 'react';

type SetStateCallback<T = any> = (currentState: T) => any;

/**
 * @description: 相当于类式组件里面的this.setState({...}, callback)
 * @param initState 初始值
 * @return 跟useState差不多，就是数组里的第二个元素可传回调函数
 */
export default function useCallbackState<T = any>(
  initState: T,
): [T, (SetStateAction: T | ((prevState: T) => T), callback?: SetStateCallback<T>) => any] {
  const ref = useRef<SetStateCallback>();
  const [value, setValue] = useState(initState);

  useEffect(() => {
    ref.current && ref.current(value);
  }, [value]);

  return [
    value,
    (value, callback) => {
      ref.current = callback;
      setValue(value);
    },
  ];
}
