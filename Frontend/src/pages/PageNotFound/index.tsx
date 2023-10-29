import { Result } from 'antd';
import type { FC, ReactElement } from 'react';

const PageNotFound: FC = (): ReactElement => {
  return (
    <Result
      title="404"
      status="404"
      style={{
        paddingTop: '100px',
      }}
      subTitle="你访问的页面不存在"
    />
  );
};

export default PageNotFound;
