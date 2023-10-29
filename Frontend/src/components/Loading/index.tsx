import { Spin } from 'antd';
import type { FC, ReactElement } from 'react';

const centerFlex: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
}
const Loading: FC = (): ReactElement => {
  return (
    <div
      style={centerFlex}
    >
      <Spin size="large" />
    </div>
  );
};

export default Loading;
