import { Button, Result } from 'antd';
import type { FC, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound: FC<any> = (props: { msg?: string, status?: "404" | "403" }): ReactElement => {
  const { msg, status } = props;
  const navigate = useNavigate();

  return (
    <Result
      title={status || "404"}
      status={status || "404"}
      style={{
        paddingTop: '100px',
      }}
      subTitle={msg || "你访问的页面不存在"}
      extra={<Button type="primary" onClick={() => { navigate('/recommend') }} >返回主页</Button>}
    />
  );
};

export default PageNotFound;
