import { Button, Card, Form, Input, Result, Select, message } from 'antd';
import { useState, type FC, type ReactElement, useRef } from 'react';
import UploadFile from './UploadFile';
import { deepClone } from '@/utils/objectUtils/deepClone';
import { getFileMd5, videoUpload } from './service';
import { categoryOptions } from '@/utils/constant';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

// const normFile = (e: any) => {
//   console.log('Upload event:', e);
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };

const UploadPage: FC = (): ReactElement => {
  const [fileList, setFileList] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const uploadFileRef = useRef<any>(null);
  const [formIns] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const formData = deepClone({
      videoName: values.videoName,
      md5: values.md5,
      categoryId: values.categoryId,
    });
    videoUpload(formData).then((res: any) => {
      if (res.data.code === 0) {
        message.success("视频发布成功！")
        uploadFileRef.current.finishClear();
        formIns.resetFields();
        setIsSuccess(true);
      } else {
        message.error(res.data.msg || "视频发布失败！请稍后重试！");
      }
    })
  };

  const onFinishFailed = (_errorInfo: any) => {
    // console.log('Failed:', errorInfo);
  };

  // 获取 UploadFile 中的 fileList
  const getFileList = (fileListProps: any) => {
    setFileList(fileListProps)
  }

  const getUploadFile = (ref: any) => {
    uploadFileRef.current = ref;
  }

  return (
    <>
      <Card style={{ width: '100%', height: '100%', minWidth: 600, backgroundColor: '#f8f6ff', overflow: 'scroll' }}>
        <Button type="text" style={{ fontSize: '18px', height: '40px' }} icon={<ArrowLeftOutlined />} onClick={() => { navigate(-1); }} >返回</Button>
        {
          isSuccess ?
            <div className='upload-success-page' style={{ display: 'flex', justifyContent: 'center' }}>
              <Result
                status="success"
                title="视频发布成功！"
                extra={[
                  <Button type="primary" key="back" onClick={() => { navigate('/recommend') }}>
                    返回首页
                  </Button>,
                  <Button key="continue" onClick={() => { setIsSuccess(false); }} >继续发布</Button>,
                ]}
              />
            </div> :
            <div className='upload-page' style={{ display: 'flex', justifyContent: 'center' }}>
              <Form
                name="upload"
                layout={'vertical'}
                form={formIns}
                style={{ maxWidth: 800, minWidth: 600, width: '100%', padding: '20px' }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                requiredMark="optional"
              >
                <h2 style={{ marginBottom: '20px' }}>发布视频</h2>
                <Form.Item
                  label="视频标题"
                  name="videoName"
                  rules={[{ required: true, message: '请输入视频标题' }]}
                >
                  <TextArea autoSize={{ minRows: 4, maxRows: 6 }} />
                </Form.Item>
                <Form.Item
                  label="视频"
                  name="md5"
                  rules={[{ required: true, message: '请上传视频' }]}
                >
                  <div style={{ overflow: 'hidden', position: 'relative', }} >
                    <UploadFile
                      getFileList={getFileList}
                      fileList={fileList}
                      // setImage={setImage}
                      getUploadFile={getUploadFile}
                      getFileMd5={getFileMd5}
                      formIns={formIns}
                    />
                  </div>
                </Form.Item>
                <Form.Item
                  name="categoryId"
                  label="视频分类"
                  rules={[{ required: true, message: '请选择视频分类' }]}
                >
                  <Select options={categoryOptions} style={{ width: 120 }}>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    发布
                  </Button>
                </Form.Item>
              </Form>
            </div>
        }

      </Card>
    </>
  );
};

export default UploadPage;
