import { InboxOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Select, Upload } from 'antd';
import type { FC, ReactElement } from 'react';

const { TextArea } = Input;

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const UploadPage: FC = (): ReactElement => {

  return (
    <>
      <Card style={{ width: '100%', height: '100%', minWidth: 600 }}>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Form
            name="upload"
            layout={'vertical'}
            // form={form}
            style={{ maxWidth: 800, minWidth: 600, width: '100%', padding: '20px' }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark="optional"
          >
            <h2 style={{ marginBottom: '20px' }}>发布视频</h2>
            <Form.Item
              label="视频标题"
              name="title"
              rules={[{ required: true, message: '请输入视频标题' }]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              label="视频"
            >
              <Form.Item
                name="video"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload.Dragger name="files" action="/upload.do">
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">点击上传 或直接将视频文件拖入此区域</p>
                  <p className="ant-upload-hint">支持常用格式，推荐使用mp4、webm</p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
            <Form.Item
              name="category"
              label="视频分类"
              rules={[{ required: true, message: '请选择视频分类' }]}
            >
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>


            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                发布
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </>
  );
};

export default UploadPage;
