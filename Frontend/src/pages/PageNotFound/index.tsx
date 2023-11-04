import { Result } from 'antd';
import type { FC, ReactElement } from 'react';

const PageNotFound: FC<any> = (props: { msg?: string, status?: "404" | "403" }): ReactElement => {
  const { msg, status } = props;

  return (
    <Result
      title={status || "404"}
      status={status || "404"}
      style={{
        paddingTop: '100px',
      }}
      subTitle={msg || "你访问的页面不存在"}
    />
  );
};

export default PageNotFound;
