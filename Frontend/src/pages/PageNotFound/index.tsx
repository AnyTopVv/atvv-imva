import { Result } from 'antd';
import type { FC, ReactElement } from 'react';

const PageNotFound: FC<any> = (props: { msg?: string }): ReactElement => {
  const { msg } = props;

  return (
    <Result
      title="404"
      status="404"
      style={{
        paddingTop: '100px',
      }}
      subTitle={msg || "你访问的页面不存在"}
    />
  );
};

export default PageNotFound;
