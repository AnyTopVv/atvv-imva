import { Component } from 'react'
import { Upload, message, Progress, Drawer } from 'antd'
import { InboxOutlined } from '@ant-design/icons';
import {
  createFileChunk,
  getFileMd5,
  uploadFile
} from './service'

class UploadFile extends Component<any> {

  state: any = {
    fileList: [],
    open: false,
    file: null,
    percent: 0,
  }

  fileMd5Value: any;

  componentDidMount() {
    this.props.getUploadFile(this)
  }
  componentDidUpdate() {
    this.props.getUploadFile(this)
  }

  showDrawer = () => {
    this.setState({
      open: true
    })
  };

  onClose = () => {
    this.setState({
      open: false
    })
  };

  // 上传文件状态发生改变时触发
  handleChange = (fileData: any) => {
    const { file, fileList } = fileData;
    if (file.response) {
      if (file.response.code === 400) {
        message.error(file.response.message)
        return
      }
    }

    this.setState({
      fileList
    })

    const { getFileList } = this.props
    //如果所有上传文件都为done返回true，否则false
    const doneFileList = fileList.filter((file: any) => {
      if (file.status === 'done') {
        return true
      } else {
        return false
      }
    })
    //展示已完成图片
    if (doneFileList.length === 1) {
      // setImage(doneFileList, Math.random())
      this.props.formIns.setFieldsValue({ md5: this.fileMd5Value });
      getFileList(doneFileList)
    }
  }

  progressBar = (file: any, percent: any) => {
    // notification.open({
    //   key: file.uid,
    //   message: percent === 100 ? `${file.name}上传成功` : `${file.name}上传中...`,
    //   description: <Progress percent={percent} />,
    //   placement: "topRight",
    //   duration: null,
    // })
    this.setState({
      file,
      percent
    }, () => {
      this.showDrawer();
    })
  }


  uploadFiles = async (files: any) => {
    if (files.file.size === 0) {
      message.info('不支持上传空文件')
      return
    } else if (files.file.size >= 5120 * 1024 * 1024) {
      message.info('仅限上传5G以内的文件')
      return
    }

    this.progressBar(files.file, 0)

    const fileName = files.file.name
    const fileType = files.file.type
    const fileChunkList = createFileChunk(files.file)
    const fileMd5Value = await getFileMd5(fileChunkList)
    this.fileMd5Value = fileMd5Value;
    this.props.formIns.setFieldsValue({ md5: undefined })
    uploadFile(fileMd5Value, fileName, fileChunkList, fileType, files, this.progressBar).then(res => {
      // 成功标志
      files.onSuccess(res, files.file);
      // setTimeout(() => {
      //   // notification.destroy(files.file.uid)
      // }, 500)
    }).catch(err => {
      // notification.destroy(files.file.uid)
      this.onClose();
      message.error(`上传失败！${err.message}`)
      files.onError(err, files.file);
    })
  }

  deleteFile = (index: any) => {
    const { fileList } = this.state
    fileList.splice(index, 1)
    this.setState({
      fileList: fileList
    })
  }

  //提交时清空所有
  finishClear = () => {
    this.setState({
      fileList: []
    })
  }

  render() {
    const { fileList } = this.state
    return (
      <>
        <Upload.Dragger
          name='multipartFile'
          // multiple={true}
          customRequest={this.uploadFiles}
          onChange={this.handleChange}
          style={{ marginTop: '20px' }}
          fileList={fileList}
          showUploadList={false} //不展示文件列表
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击上传 或直接将视频文件拖入此区域</p>
          <p className="ant-upload-hint">支持常用格式，推荐使用mp4、webm</p>
        </Upload.Dragger>
        <Drawer
          placement="bottom"
          closable={false}
          onClose={this.onClose}
          open={this.state.open}
          getContainer={false}
          height={"100%"}
          mask={false}
        >
          <p>
            {this.state.file ? this.state.percent === 100 ? `${this.state.file.name}上传成功` : `${this.state.file.name}上传中...` : `待上传视频`}
          </p>
          <Progress percent={this.state.percent} />
          {/* <Button type="primary" onClick={this.onClose}>
            取消上传
          </Button> */}
        </Drawer>
        {/* <Button type="primary" onClick={this.showDrawer}>
          Open
        </Button> */}
      </>

    )
  }
}

export default UploadFile
