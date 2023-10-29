import { useState } from 'react';

function useForceUpdate() {
  const [_value, setValue] = useState(0);

  return () => {
    setValue(value => value + 1);
  };
}

export default useForceUpdate